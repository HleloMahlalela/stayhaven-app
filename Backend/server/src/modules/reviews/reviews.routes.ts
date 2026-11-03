import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Review } from "../../models/Review.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireRole } from "../../middleware/requireRole.js";
import { Role } from "../../db/models/enums.js";

export const reviewsRouter = Router();

reviewsRouter.get("/:listingId", async (req, res, next) => {
  try {
    const listingId = String(req.params.listingId);
    if (!mongoose.isValidObjectId(listingId)) { res.json([]); return; }
    res.json(await Review.find({ listing: new mongoose.Types.ObjectId(listingId) }).populate("guest", "fullName").sort({ createdAt: -1 }));
  } catch (error) { next(error); }
});

reviewsRouter.post("/:listingId", requireAuth, requireRole(Role.GUEST), async (req, res, next) => {
  try {
    const listingId = String(req.params.listingId);
    if (!mongoose.isValidObjectId(listingId)) { res.status(404).json({ message: "Listing not found" }); return; }
    const input = z.object({ rating: z.number().int().min(1).max(5), comment: z.string().trim().min(1) }).parse(req.body);
    const review = await Review.create({ ...input, listing: new mongoose.Types.ObjectId(listingId), guest: req.user!.id });
    res.status(201).json(await review.populate("guest", "fullName"));
  } catch (error) { next(error); }
});
