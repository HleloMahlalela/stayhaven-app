import { model, Schema, type Model, type Types } from "mongoose";

export interface IThread {
  guestId: string;
  houselisterId: string;
  listingId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  lastMessageAt: Date;
}

const threadSchema = new Schema<IThread>({
  guestId: { type: String, ref: "User", required: true },
  houselisterId: { type: String, ref: "User", required: true },
  listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
  lastMessageAt: { type: Date, default: Date.now, required: true },
}, { timestamps: true, versionKey: false });

threadSchema.index({ guestId: 1, houselisterId: 1, listingId: 1 }, { unique: true });

export const Thread: Model<IThread> = model<IThread>("Thread", threadSchema);
