import type { CookieOptions, Request, RequestHandler } from "express";
import { env } from "../../config/env.js";
import { Role } from "../../db/models/enums.js";
import { AuthError } from "./auth.service.js";
import { mailer } from "../../lib/mailer.js";
import {
  forgotPassword,
  loginUser,
  logoutAll as revokeAllSessions,
  logoutSession,
  me,
  refreshSession,
  registerUser,
  resetPassword,
  verifyEmail,
} from "./auth.service.js";
import {
  ForgotSchema,
  LoginSchema,
  RegisterSchema,
  ResetSchema,
  VerifyEmailSchema,
} from "./auth.schemas.js";

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: "lax",
  path: "/api/v1/auth",
  maxAge: env.REFRESH_TOKEN_TTL_DAYS * 864e5,
};

function readRefresh(req: Request): string | undefined {
  const cookieToken = req.cookies?.refreshToken;
  if (typeof cookieToken === "string" && cookieToken.length > 0) {
    return cookieToken;
  }

  const bodyToken = req.body?.refreshToken;
  return typeof bodyToken === "string" && bodyToken.length > 0 ? bodyToken : undefined;
}

function requireUserId(req: Request): string {
  if (!req.user?.id) {
    throw new AuthError("UNAUTHORIZED", 401, "Authentication is required.");
  }
  return req.user.id;
}

export const register: RequestHandler = async (req, res, next) => {
  try {
    const input = RegisterSchema.parse(req.body);
    const user = await registerUser({ ...input, role: input.role as Role });
    void mailer.send({
      to: user.email,
      subject: "Welcome to StayHaven",
      body: `Hi ${user.fullName}, your StayHaven account has been created successfully.`,
    });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const input = LoginSchema.parse(req.body);
    const result = await loginUser({
      ...input,
      userAgent: req.get("user-agent") ?? undefined,
      ip: req.ip,
    });
    void mailer.send({
      to: result.user.email,
      subject: "New Sign-In to StayHaven",
      body: `A successful sign-in to your StayHaven account occurred at ${new Date().toISOString()}.`,
    });
    res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);
    console.log("SENDING LOGIN RESPONSE:", result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const rawRefresh = readRefresh(req);
    if (!rawRefresh) {
      res.status(401).json({ error: { code: "NO_REFRESH" } });
      return;
    }

    const result = await refreshSession(rawRefresh);
    res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const rawRefresh = readRefresh(req);
    if (rawRefresh) {
      await logoutSession(rawRefresh);
    }
    res.clearCookie("refreshToken", {
      httpOnly: refreshCookieOptions.httpOnly,
      secure: refreshCookieOptions.secure,
      sameSite: refreshCookieOptions.sameSite,
      path: refreshCookieOptions.path,
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

export const logoutAll: RequestHandler = async (req, res, next) => {
  try {
    await revokeAllSessions(requireUserId(req));
    res.clearCookie("refreshToken", {
      httpOnly: refreshCookieOptions.httpOnly,
      secure: refreshCookieOptions.secure,
      sameSite: refreshCookieOptions.sameSite,
      path: refreshCookieOptions.path,
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

export const meHandler: RequestHandler = async (req, res, next) => {
  try {
    const user = await me(requireUserId(req));
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const forgot: RequestHandler = async (req, res, next) => {
  try {
    const { email } = ForgotSchema.parse(req.body);
    await forgotPassword(email);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

export const reset: RequestHandler = async (req, res, next) => {
  try {
    const { token, newPassword } = ResetSchema.parse(req.body);
    await resetPassword(token, newPassword);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailHandler: RequestHandler = async (req, res, next) => {
  try {
    const { token } = VerifyEmailSchema.parse(req.body);
    await verifyEmail(token);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

