import { model, Schema, Types, type HydratedDocument, type Model } from "mongoose";
import { Role, UserStatus } from "./enums.js";

export { Role, UserStatus } from "./enums.js";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  fullName: string;
  role: Role;
  status: UserStatus;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.GUEST, required: true },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE, required: true },
    emailVerifiedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

userSchema.index({ email: 1 }, { unique: true });

export const User: Model<IUser> = model<IUser>("User", userSchema);
