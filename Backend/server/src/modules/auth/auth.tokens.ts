import { createHash, randomBytes } from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { Role } from "@prisma/client";
import { env } from "../../config/env.js";

const roles = new Set<Role>(["GUEST", "HOUSE_ADMIN", "APP_ADMIN"]);

export function signAccessToken(payload: { sub: string; role: Role }): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_TTL as SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): { sub: string; role: Role } {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

  if (
    typeof decoded === "string" ||
    typeof decoded.sub !== "string" ||
    typeof decoded.role !== "string" ||
    !roles.has(decoded.role as Role)
  ) {
    throw new Error("Invalid access token payload");
  }

  return { sub: decoded.sub, role: decoded.role as Role };
}

export function generateRefreshToken(): { raw: string; hash: string; expiresAt: Date } {
  const raw = randomBytes(48).toString("hex");
  const expiresAt = new Date(
    Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
  );

  return { raw, hash: hashToken(raw), expiresAt };
}

export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}
