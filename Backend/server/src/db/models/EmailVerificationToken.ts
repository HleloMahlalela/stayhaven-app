import { randomUUID } from "node:crypto";
import { model, Schema, type HydratedDocument, type Model } from "mongoose";

export interface IEmailVerificationToken {
  _id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
}

export type EmailVerificationTokenDocument = HydratedDocument<IEmailVerificationToken>;

const emailVerificationTokenSchema = new Schema<IEmailVerificationToken>(
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

emailVerificationTokenSchema.index({ userId: 1 });
emailVerificationTokenSchema.index({ tokenHash: 1 }, { unique: true });
emailVerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EmailVerificationToken: Model<IEmailVerificationToken> = model<IEmailVerificationToken>(
  "EmailVerificationToken",
  emailVerificationTokenSchema,
);
