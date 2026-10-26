import { Router } from "express";
import * as controller from "./auth.controller.js";
import {
  forgotLimiter,
  loginLimiter,
  registerLimiter,
} from "../../middleware/rateLimiters.js";
import { requireAuth } from "../../middleware/requireAuth.js";

export const authRouter = Router();

authRouter.post("/register", registerLimiter, controller.register);
authRouter.post("/login", loginLimiter, controller.login);
authRouter.post("/refresh", controller.refresh);
authRouter.post("/logout", controller.logout);
authRouter.post("/logout-all", requireAuth, controller.logoutAll);
authRouter.get("/me", requireAuth, controller.meHandler);
authRouter.post("/forgot-password", forgotLimiter, controller.forgot);
authRouter.post("/reset-password", controller.reset);
authRouter.post("/verify-email", controller.verifyEmailHandler);
