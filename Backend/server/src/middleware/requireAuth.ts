import type { RequestHandler } from "express";
import { User, UserStatus } from "../db/models/User.js";
import { verifyAccessToken } from "../modules/auth/auth.tokens.js";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const authorization = req.get("authorization");
  const match = authorization?.match(/^Bearer\s+(\S+)$/i);
  if (!match) {
    const error = new Error("Missing or malformed Bearer authorization header");
    console.log("BACKEND AUTH REJECTED. Header:", req.headers.authorization, "Error:", error.message);
    res.status(401).json({ error: { code: "NO_TOKEN" } });
    return;
  }

  const token = match[1];
  let payload: ReturnType<typeof verifyAccessToken>;
  try {
    payload = verifyAccessToken(token);
  } catch (error: any) {
    console.error("JWT VERIFICATION FAILED. Error:", error.message, "Token received:", token);
    const message = error instanceof Error ? error.message : String(error);
    console.log("BACKEND AUTH REJECTED. Header:", req.headers.authorization, "Error:", message);
    res.status(401).json({ error: { code: "BAD_TOKEN" } });
    return;
  }

  try {
    const user = await User.findById(payload.sub).select("email role status");
    if (!user) {
      const error = new Error("Token subject does not match an existing user");
      console.log("BACKEND AUTH REJECTED. Header:", req.headers.authorization, "Error:", error.message);
      res.status(401).json({ error: { code: "USER_GONE" } });
      return;
    }
    if (user.status !== UserStatus.ACTIVE) {
      res.status(403).json({ error: { code: "ACCOUNT_SUSPENDED" } });
      return;
    }

    req.user = { id: user.id, email: user.email, role: user.role, status: user.status };
    next();
  } catch (error) {
    next(error);
  }
};
