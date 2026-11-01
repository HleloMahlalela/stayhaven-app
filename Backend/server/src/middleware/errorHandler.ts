import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AuthError } from "../modules/auth/auth.service.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("BACKEND CRASH:", err);
  if (err instanceof AuthError) {
    res.status(err.status).json({
      error: { code: err.code, message: err.message },
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: { code: "VALIDATION_ERROR", issues: err.issues },
    });
    return;
  }

  res.status(500).json({ message: err.message, stack: err.stack });
};
