import { model, Schema, type Model } from "mongoose";

export interface IBooking {
  listing: Schema.Types.ObjectId;
  guest: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
}

const bookingSchema = new Schema<IBooking>({
  listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  guest: { type: String, ref: "User", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, min: 0, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
}, { timestamps: true });

export const Booking: Model<IBooking> = model<IBooking>("Booking", bookingSchema);
