import mongoose from "mongoose";

interface ListingDocument {
  title: string;
  description: string;
  location: string;
  price: number;
  currency: string;
  discount: number;
  discountInterval: number;
  images: string[];
  amenities: string[];
  hostId: string;
  status: "pending" | "approved" | "suspended";
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new mongoose.Schema<ListingDocument>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: "BWP", trim: true },
  discount: { type: Number, default: 0, min: 0 },
  discountInterval: { type: Number, default: 1, min: 1 },
  images: { type: [String], default: [] },
  amenities: { type: [String], default: [] },
  hostId: { type: String, ref: "User", required: true },
  status: { type: String, enum: ["pending", "approved", "suspended"], default: "pending" },
}, { timestamps: true });

export const Listing =
  (mongoose.models.Listing as mongoose.Model<ListingDocument> | undefined) ??
  mongoose.model<ListingDocument>("Listing", listingSchema);
