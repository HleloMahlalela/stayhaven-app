import { randomBytes } from "node:crypto";
import type { Role } from "@prisma/client";
import { env } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import { mailer } from "../../lib/mailer.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
import { getWorkspaceForRole } from "../../lib/workspace.js";
import {
  generateRefreshToken,
  hashToken,
  signAccessToken,
} from "./auth.tokens.js";

export class AuthError extends Error {
  constructor(
    public code: string,
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

function frontendLink(path: string, token: string): string {
  const origin = env.FRONTEND_ORIGINS.split(",").map((value) => value.trim()).find(Boolean)
    ?? "http://localhost:3000";
  const url = new URL(path, origin);
  url.searchParams.set("token", token);
  return url.toString();
}

export async function registerUser({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}): Promise<{ id: string; email: string; fullName: string; role: Role }> {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AuthError("EMAIL_TAKEN", 409, "An account with this email already exists.");
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, fullName, role: "GUEST", status: "ACTIVE" },
  });

  const rawToken = randomBytes(32).toString("hex");
  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(rawToken),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await mailer.send({
    to: user.email,
    subject: "Verify your StayHaven email",
    body: `Verify your email: ${frontendLink("/verify-email", rawToken)}`,
  });

  return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
}

export async function loginUser({
  email,
  password,
  userAgent,
  ip,
}: {
  email: string;
  password: string;
  userAgent?: string;
  ip?: string;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    workspace: ReturnType<typeof getWorkspaceForRole>;
  };
}> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new AuthError("INVALID_CREDENTIALS", 401, "Invalid email or password.");
  }
  if (user.status === "SUSPENDED") {
    throw new AuthError("ACCOUNT_SUSPENDED", 403, "This account is suspended.");
  }

  const refresh = generateRefreshToken();
  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: refresh.hash,
      userAgent,
      ipAddress: ip,
      expiresAt: refresh.expiresAt,
    },
  });

  return {
    accessToken: signAccessToken({ sub: user.id, role: user.role }),
    refreshToken: refresh.raw,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      workspace: getWorkspaceForRole(user.role),
    },
  };
}

export async function refreshSession(rawRefresh: string): Promise<{
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    workspace: ReturnType<typeof getWorkspaceForRole>;
  };
}> {
  const session = await prisma.session.findFirst({
    where: { tokenHash: hashToken(rawRefresh) },
    include: { user: true },
  });
  if (!session) {
    throw new AuthError("INVALID_REFRESH", 401, "Refresh token is invalid.");
  }

  if (session.revokedAt) {
    await prisma.session.updateMany({
      where: { userId: session.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    throw new AuthError("REFRESH_REUSE", 401, "Refresh token reuse detected.");
  }
  if (session.expiresAt <= new Date()) {
    throw new AuthError("REFRESH_EXPIRED", 401, "Refresh token has expired.");
  }
  if (session.user.status === "SUSPENDED") {
    throw new AuthError("ACCOUNT_SUSPENDED", 403, "This account is suspended.");
  }

  const refresh = generateRefreshToken();
  const rotated = await prisma.$transaction(async (tx) => {
    const revokeResult = await tx.session.updateMany({
      where: { id: session.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    if (revokeResult.count !== 1) {
      await tx.session.updateMany({
        where: { userId: session.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      return false;
    }

    await tx.session.create({
      data: {
        userId: session.userId,
        tokenHash: refresh.hash,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        expiresAt: refresh.expiresAt,
      },
    });
    return true;
  });

  if (!rotated) {
    throw new AuthError("REFRESH_REUSE", 401, "Refresh token reuse detected.");
  }

  return {
    accessToken: signAccessToken({ sub: session.user.id, role: session.user.role }),
    refreshToken: refresh.raw,
    user: {
      id: session.user.id,
      email: session.user.email,
      fullName: session.user.fullName,
      role: session.user.role,
      workspace: getWorkspaceForRole(session.user.role),
    },
  };
}

export async function logoutSession(rawRefresh: string): Promise<void> {
  await prisma.session.updateMany({
    where: { tokenHash: hashToken(rawRefresh), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function logoutAll(userId: string): Promise<void> {
  await prisma.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function me(userId: string): Promise<{
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
  emailVerifiedAt: Date | null;
  workspace: ReturnType<typeof getWorkspaceForRole>;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      status: true,
      emailVerifiedAt: true,
    },
  });
  if (!user) {
    throw new AuthError("NOT_FOUND", 404, "User not found.");
  }

  return { ...user, workspace: getWorkspaceForRole(user.role) };
}

export async function forgotPassword(email: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const rawToken = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(rawToken),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  await mailer.send({
    to: user.email,
    subject: "Reset your StayHaven password",
    body: `Reset your password: ${frontendLink("/reset-password", rawToken)}`,
  });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { tokenHash: hashToken(token) },
  });
  const now = new Date();
  if (!resetToken || resetToken.usedAt || resetToken.expiresAt <= now) {
    throw new AuthError("INVALID_RESET", 400, "Password reset token is invalid or expired.");
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.$transaction(async (tx) => {
    const used = await tx.passwordResetToken.updateMany({
      where: { id: resetToken.id, usedAt: null, expiresAt: { gt: now } },
      data: { usedAt: now },
    });
    if (used.count !== 1) {
      throw new AuthError("INVALID_RESET", 400, "Password reset token is invalid or expired.");
    }

    await tx.user.update({ where: { id: resetToken.userId }, data: { passwordHash } });
    await tx.session.updateMany({
      where: { userId: resetToken.userId, revokedAt: null },
      data: { revokedAt: now },
    });
  });
}

export async function verifyEmail(token: string): Promise<void> {
  const verificationToken = await prisma.emailVerificationToken.findFirst({
    where: { tokenHash: hashToken(token) },
  });
  const now = new Date();
  if (!verificationToken || verificationToken.usedAt || verificationToken.expiresAt <= now) {
    throw new AuthError("INVALID_VERIFY", 400, "Email verification token is invalid or expired.");
  }

  await prisma.$transaction(async (tx) => {
    const used = await tx.emailVerificationToken.updateMany({
      where: { id: verificationToken.id, usedAt: null, expiresAt: { gt: now } },
      data: { usedAt: now },
    });
    if (used.count !== 1) {
      throw new AuthError("INVALID_VERIFY", 400, "Email verification token is invalid or expired.");
    }

    await tx.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerifiedAt: now },
    });
  });
}
