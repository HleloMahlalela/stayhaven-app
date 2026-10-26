import type { RequestHandler } from "express";

export function requireSelfOrAppAdmin(paramKey = "userId"): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: { code: "NO_AUTH" } });
      return;
    }
    if (req.user.role !== "APP_ADMIN" && req.user.id !== req.params[paramKey]) {
      res.status(403).json({ error: { code: "INSUFFICIENT_ROLE" } });
      return;
    }
    next();
  };
}
