import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_ACCESS_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(7),
  FRONTEND_ORIGINS: z.string().default("http://localhost:5173"),
  COOKIE_SECURE: z.preprocess(
    (value: unknown) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    },
    z.boolean().default(false),
  ),
});

export const env = envSchema.parse(process.env);
