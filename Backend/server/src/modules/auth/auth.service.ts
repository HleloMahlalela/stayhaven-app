import { randomBytes } from "node:crypto";
import { Role } from "../../db/models/enums.js";
import { EmailVerificationToken } from "../../db/models/EmailVerificationToken.js";
import { PasswordResetToken } from "../../db/models/PasswordResetToken.js";
import { Session } from "../../db/models/Session.js";
import { User, UserStatus } from "../../db/models/User.js";
import { env } from "../../config/env.js";
import { mailer } from "../../lib/mailer.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
import { getWorkspaceForRole } from "../../lib/workspace.js";
import { generateRefreshToken, hashToken, signAccessToken } from "./auth.tokens.js";

export class AuthError extends Error {
  constructor(public code: string, public status: number, message: string) {
    super(message);
    this.name = "AuthError";
  }
}

function frontendLink(path: string, token: string): string {
  const origin = env.FRONTEND_ORIGINS.split(",").map((value) => value.trim()).find(Boolean)
    ?? "http://localhost:5173";
  const url = new URL(path, origin);
  url.searchParams.set("token", token);
  return url.toString();
}

export async function registerUser({ email, password, fullName, role }: {
  email: string; password: string; fullName: string; role?: Role;
}): Promise<{ id: string; email: string; fullName: string; role: Role }> {
  if (await User.exists({ email })) {
    throw new AuthError("EMAIL_TAKEN", 409, "An account with this email already exists.");
  }
  const passwordHash = await hashPassword(password);
  let user;
  try {
    user = await User.create({ email, passwordHash, fullName, role: role ?? Role.GUEST, status: UserStatus.ACTIVE });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      throw new AuthError("EMAIL_TAKEN", 409, "An account with this email already exists.");
    }
    throw error;
  }
  const rawToken = randomBytes(32).toString("hex");
  await EmailVerificationToken.create({ userId: user.id, tokenHash: hashToken(rawToken), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) });
  await mailer.send({ to: user.email, subject: "Verify your StayHaven email", body: `Verify your email: ${frontendLink("/verify-email", rawToken)}` });
  return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
}

type AuthResult = {
  accessToken: string; refreshToken: string;
  user: { id: string; email: string; fullName: string; role: Role; workspace: ReturnType<typeof getWorkspaceForRole> };
};

function authResult(user: { id: string; email: string; fullName: string; role: Role }, refreshToken: string): AuthResult {
  return { accessToken: signAccessToken({ sub: user.id, role: user.role }), refreshToken,
    user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role, workspace: getWorkspaceForRole(user.role) } };
}

export async function loginUser({ email, password, userAgent, ip }: {
  email: string; password: string; userAgent?: string; ip?: string;
}): Promise<AuthResult> {
  const user = await User.findOne({ email });
  if (!user || !(await verifyPassword(password, user.passwordHash))) throw new AuthError("INVALID_CREDENTIALS", 401, "Invalid email or password.");
  if (user.status === UserStatus.SUSPENDED) throw new AuthError("ACCOUNT_SUSPENDED", 403, "This account is suspended.");
  const refresh = generateRefreshToken();
  await Session.create({ userId: user.id, tokenHash: refresh.hash, userAgent, ipAddress: ip, expiresAt: refresh.expiresAt });
  return authResult(user, refresh.raw);
}

export async function refreshSession(rawRefresh: string): Promise<AuthResult> {
  const session = await Session.findOne({ tokenHash: hashToken(rawRefresh) });
  if (!session) throw new AuthError("INVALID_REFRESH", 401, "Refresh token is invalid.");
  if (session.revokedAt) {
    await Session.updateMany({ userId: session.userId, revokedAt: null }, { $set: { revokedAt: new Date() } });
    throw new AuthError("REFRESH_REUSE", 401, "Refresh token reuse detected.");
  }
  if (session.expiresAt <= new Date()) throw new AuthError("REFRESH_EXPIRED", 401, "Refresh token has expired.");
  const user = await User.findById(session.userId);
  if (!user) throw new AuthError("INVALID_REFRESH", 401, "Refresh token is invalid.");
  if (user.status === UserStatus.SUSPENDED) throw new AuthError("ACCOUNT_SUSPENDED", 403, "This account is suspended.");

  const refresh = generateRefreshToken();
  const revoked = await Session.findOneAndUpdate({ _id: session.id, revokedAt: null }, { $set: { revokedAt: new Date() } });
  if (!revoked) {
    await Session.updateMany({ userId: session.userId, revokedAt: null }, { $set: { revokedAt: new Date() } });
    throw new AuthError("REFRESH_REUSE", 401, "Refresh token reuse detected.");
  }
  // Sequential writes can leave the old token revoked if creating its replacement fails.
  await Session.create({ userId: session.userId, tokenHash: refresh.hash, userAgent: session.userAgent, ipAddress: session.ipAddress, expiresAt: refresh.expiresAt });
  return authResult(user, refresh.raw);
}

export async function logoutSession(rawRefresh: string): Promise<void> {
  await Session.updateMany({ tokenHash: hashToken(rawRefresh), revokedAt: null }, { $set: { revokedAt: new Date() } });
}
export async function logoutAll(userId: string): Promise<void> {
  await Session.updateMany({ userId, revokedAt: null }, { $set: { revokedAt: new Date() } });
}

export async function me(userId: string): Promise<{
  id: string; email: string; fullName: string; role: Role;
  status: "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION"; emailVerifiedAt: Date | null;
  workspace: ReturnType<typeof getWorkspaceForRole>;
}> {
  const user = await User.findById(userId).select("email fullName role status emailVerifiedAt");
  if (!user) throw new AuthError("NOT_FOUND", 404, "User not found.");
  return { id: user.id, email: user.email, fullName: user.fullName, role: user.role, status: user.status, emailVerifiedAt: user.emailVerifiedAt, workspace: getWorkspaceForRole(user.role) };
}

export async function forgotPassword(email: string): Promise<void> {
  const user = await User.findOne({ email });
  if (!user) return;
  const rawToken = randomBytes(32).toString("hex");
  await PasswordResetToken.create({ userId: user.id, tokenHash: hashToken(rawToken), expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
  await mailer.send({ to: user.email, subject: "Reset your StayHaven password", body: `Reset your password: ${frontendLink("/reset-password", rawToken)}` });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const now = new Date();
  const resetToken = await PasswordResetToken.findOneAndUpdate({ tokenHash: hashToken(token), usedAt: null, expiresAt: { $gt: now } }, { $set: { usedAt: now } });
  if (!resetToken) throw new AuthError("INVALID_RESET", 400, "Password reset token is invalid or expired.");
  const passwordHash = await hashPassword(newPassword);
  await User.updateOne({ _id: resetToken.userId }, { $set: { passwordHash } });
  await Session.updateMany({ userId: resetToken.userId, revokedAt: null }, { $set: { revokedAt: now } });
}

export async function verifyEmail(token: string): Promise<void> {
  const now = new Date();
  const verificationToken = await EmailVerificationToken.findOneAndUpdate({ tokenHash: hashToken(token), usedAt: null, expiresAt: { $gt: now } }, { $set: { usedAt: now } });
  if (!verificationToken) throw new AuthError("INVALID_VERIFY", 400, "Email verification token is invalid or expired.");
  await User.updateOne({ _id: verificationToken.userId }, { $set: { emailVerifiedAt: now } });
}
