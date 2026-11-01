import { randomUUID } from "node:crypto";
import { model, Schema, type HydratedDocument, type Model } from "mongoose";

export interface IPasswordResetToken {
  _id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
}

export type PasswordResetTokenDocument = HydratedDocument<IPasswordResetToken>;

const passwordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    _id: { type: String, default: () => randomUUID() },
    userId: { type: String, ref: "User", required: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    usedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

passwordResetTokenSchema.index({ userId: 1 });
passwordResetTokenSchema.index({ tokenHash: 1 }, { unique: true });
passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordResetToken: Model<IPasswordResetToken> = model<IPasswordResetToken>(
  "PasswordResetToken",
  passwordResetTokenSchema,
);
