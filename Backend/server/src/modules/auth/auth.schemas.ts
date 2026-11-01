import { z } from "zod";

export const passwordSchema = z.string().min(8).max(200);

const emailSchema = z.string().trim().toLowerCase().email();

export const RegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: z.string().min(2).max(120),
  role: z.enum(["GUEST", "HOUSE_ADMIN"]).optional().default("GUEST"),
});

export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const RefreshSchema = z.object({
  refreshToken: z.string().optional(),
});

export const ForgotSchema = z.object({
  email: emailSchema,
});

export const ResetSchema = z.object({
  token: z.string().min(1),
  newPassword: passwordSchema,
});

export const VerifyEmailSchema = z.object({
  token: z.string().min(1),
});
