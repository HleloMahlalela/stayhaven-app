import { model, Schema, Types, type Model } from "mongoose";

export interface IReview {
  listing: Types.ObjectId;
  guest: string;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>({
  listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  guest: { type: String, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true, trim: true },
}, { timestamps: true });

export const Review: Model<IReview> = model<IReview>("Review", reviewSchema);
