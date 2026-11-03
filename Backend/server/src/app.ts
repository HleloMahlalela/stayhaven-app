import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import multer from "multer";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { z } from "zod";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { listingsRouter } from "./modules/listings/listings.routes.js";
import { requireAuth } from "./middleware/requireAuth.js";
import { requireRole } from "./middleware/requireRole.js";
import { Role } from "./db/models/enums.js";
import { User } from "./db/models/User.js";
import { bookingsRouter } from "./modules/bookings/bookings.routes.js";
import { reviewsRouter } from "./modules/reviews/reviews.routes.js";
import { messagesRouter } from "./modules/messages/messages.routes.js";

const appDirectory = path.dirname(decodeURIComponent(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1"));
const uploadsDirectory = path.resolve(appDirectory, "../uploads");
mkdirSync(uploadsDirectory, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDirectory,
    filename: (_req, file, callback) => callback(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => callback(null, file.mimetype.startsWith("image/")),
});

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors({
    origin: env.FRONTEND_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());
  app.use("/uploads", (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  }, express.static(uploadsDirectory));

  app.get("/health", (_req, res) => res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  }));
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/listings", listingsRouter);
  app.use("/api/v1/bookings", bookingsRouter);
  app.use("/api/v1/reviews", reviewsRouter);
  app.use("/api/v1/messages", messagesRouter);
  app.post("/api/v1/upload", requireAuth, upload.single("file"), (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: "An image file is required." });
      return;
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
  app.patch("/api/v1/users/:id/status", requireAuth, requireRole(Role.APP_ADMIN), async (req, res, next) => {
    try {
      const { status } = z.object({ status: z.enum(["ACTIVE", "SUSPENDED"]) }).parse(req.body);
      const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true }).select("_id email fullName role status createdAt");
      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }
      res.json(user);
    } catch (error) { next(error); }
  });
  app.get("/api/v1/users", requireAuth, requireRole(Role.APP_ADMIN), async (req, res, next) => {
    try {
      const requestedRole = typeof req.query.role === "string" ? req.query.role : undefined;
      const role = requestedRole && Object.values(Role).includes(requestedRole as Role) ? requestedRole as Role : undefined;
      const users = await User.find(role ? { role } : {}).select("_id email fullName role status createdAt").sort({ createdAt: -1 });
      res.json(users);
    } catch (error) { next(error); }
  });
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
