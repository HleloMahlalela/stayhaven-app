import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: "BWP", trim: true },
  discount: { type: Number, default: 0, min: 0 },
  images: { type: [String], default: [] },
  amenities: { type: [String], default: [] },
  hostId: { type: String, ref: "User", required: true },
  status: { type: String, enum: ["pending", "approved", "suspended"], default: "pending" },
}, { timestamps: true });

export const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
