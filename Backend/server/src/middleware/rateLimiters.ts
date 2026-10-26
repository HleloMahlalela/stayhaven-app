import rateLimit from "express-rate-limit";

const rateLimitMessage = (message: string) => ({
  error: { code: "RATE_LIMITED", message },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: rateLimitMessage("Too many login attempts. Please try again later."),
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  message: rateLimitMessage("Too many registration attempts. Please try again later."),
});

export const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: rateLimitMessage("Too many password reset attempts. Please try again later."),
});
