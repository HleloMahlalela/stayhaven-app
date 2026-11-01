import type { Role } from "../db/models/enums.js";
import type { RequestHandler } from "express";

export function requireRole(...roles: Role[]): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: { code: "NO_AUTH" } });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: { code: "INSUFFICIENT_ROLE" } });
      return;
    }
    next();
  };
}
