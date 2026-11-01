import { Router } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import { Listing } from "../../models/Listing.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireRole } from "../../middleware/requireRole.js";
import { Role } from "../../db/models/enums.js";
import { CreateListingSchema } from "./listings.schemas.js";

export const listingsRouter = Router();

listingsRouter.get("/", async (req, res, next) => {
  try {
    const location = typeof req.query.location === "string" ? req.query.location : undefined;
    const listings = await Listing.find({
      status: "approved",
      ...(location ? { location: { $regex: location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } } : {}),
    }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    next(error);
  }
});

listingsRouter.get("/host", requireAuth, requireRole(Role.HOUSE_ADMIN), async (req, res, next) => {
  try {
    res.json(await Listing.find({ hostId: req.user!.id }).sort({ createdAt: -1 }));
  } catch (error) { next(error); }
});

listingsRouter.get("/admin/pending", requireAuth, requireRole(Role.APP_ADMIN), async (_req, res, next) => {
  try { res.json(await Listing.find({ status: "pending" }).sort({ createdAt: -1 })); }
  catch (error) { next(error); }
});

listingsRouter.patch("/:id/status", requireAuth, requireRole(Role.APP_ADMIN), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) { res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } }); return; }
    const status = z.enum(["approved", "suspended"]).parse(req.body.status);
    const listing = await Listing.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!listing) { res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } }); return; }
    res.json(listing);
  } catch (error) { next(error); }
});

listingsRouter.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } });
      return;
    }
    const listing = await Listing.findOne({ _id: req.params.id, status: "approved" });
    if (!listing) {
      res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } });
      return;
    }
    res.json(listing);
  } catch (error) {
    next(error);
  }
});

listingsRouter.post("/", requireAuth, async (req, res, next) => {
  try {
    if (req.user?.role !== "HOUSE_ADMIN") {
      res.status(403).json({ error: { code: "FORBIDDEN" } });
      return;
    }
    const input = CreateListingSchema.parse(req.body);
    const listing = await Listing.create({ ...input, hostId: req.user.id, status: "pending" });
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
});
