import { model, Schema, type Model, type Types } from "mongoose";
import { Role } from "../db/models/enums.js";

export interface IMessage {
  threadId: Types.ObjectId;
  senderId: string;
  senderRole: Role.GUEST | Role.HOUSE_ADMIN;
  listingId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  body: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  threadId: { type: Schema.Types.ObjectId, ref: "Thread", required: true, index: true },
  senderId: { type: String, ref: "User", required: true },
  senderRole: { type: String, enum: [Role.GUEST, Role.HOUSE_ADMIN], required: true },
  listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
  body: { type: String, required: true, trim: true, maxlength: 5000 },
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });

messageSchema.index({ threadId: 1, createdAt: 1 });

export const Message: Model<IMessage> = model<IMessage>("Message", messageSchema);
