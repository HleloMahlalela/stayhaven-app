import { Router } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import { Listing } from "../../models/Listing.js";
import { Booking } from "../../models/Booking.js";
import { User } from "../../db/models/User.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireRole } from "../../middleware/requireRole.js";
import { Role } from "../../db/models/enums.js";
import { CreateListingSchema } from "./listings.schemas.js";

export const listingsRouter = Router();

async function withHostNames(listings: Array<{ hostId: string } & Record<string, any>>) {
  const hostIds = [...new Set(listings.map((listing) => listing.hostId))];
  const hosts = await User.find({ _id: { $in: hostIds } }).select("_id fullName").lean();
  const names = new Map(hosts.map((host) => [String(host._id), host.fullName]));
  return listings.map((listing) => ({ ...listing, host: { fullName: names.get(listing.hostId) || "" } }));
}

listingsRouter.get("/", async (req, res, next) => {
  try {
    const location = typeof req.query.location === "string" ? req.query.location : undefined;
    const baseQuery: Record<string, any> = {
      status: "approved",
      ...(location ? { location: { $regex: location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } } : {}),
    };
    const checkInValue = typeof req.query.checkIn === "string" ? req.query.checkIn : undefined;
    const checkOutValue = typeof req.query.checkOut === "string" ? req.query.checkOut : undefined;
    if (checkInValue && checkOutValue) {
      const checkIn = new Date(checkInValue);
      const checkOut = new Date(checkOutValue);
      if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
        res.status(400).json({ message: "Check-in and check-out must be valid dates." });
        return;
      }
      if (checkIn < checkOut) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (checkIn < today) { res.status(400).json({ message: "Check-in cannot be in the past." }); return; }
        const candidates = await Listing.find(baseQuery).select("_id").lean();
        const candidateIds = candidates.map((listing) => listing._id);
        const blockedListingIds = await Booking.distinct("listing", {
          listing: { $in: candidateIds },
          status: { $in: ["pending", "confirmed"] },
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn },
        });
        baseQuery._id = { $nin: blockedListingIds };
      }
    }
    const listings = await Listing.find(baseQuery).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    next(error);
  }
});

listingsRouter.get("/admin/my-listings", requireAuth, requireRole(Role.HOUSE_ADMIN), async (req, res, next) => {
  try {
    res.json(await Listing.find({ hostId: req.user!.id }).sort({ createdAt: -1 }));
  } catch (error) { next(error); }
});

listingsRouter.patch("/:id", requireAuth, requireRole(Role.HOUSE_ADMIN), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) { res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } }); return; }
    const listing = await Listing.findOne({ _id: req.params.id, hostId: req.user!.id });
    if (!listing) { res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } }); return; }
    for (const key of ["title", "description", "location", "price", "currency", "discount", "discountInterval", "images", "amenities"] as const) {
      if (req.body[key] !== undefined) (listing as any)[key] = req.body[key];
    }
    await listing.save();
    res.json(listing);
  } catch (error) { next(error); }
});

listingsRouter.delete("/:id", requireAuth, requireRole(Role.HOUSE_ADMIN), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) { res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } }); return; }
    const deleted = await Listing.findOneAndDelete({ _id: req.params.id, hostId: req.user!.id });
    if (!deleted) { res.status(404).json({ error: { code: "LISTING_NOT_FOUND" } }); return; }
    res.status(204).end();
  } catch (error) { next(error); }
});

listingsRouter.get("/admin/pending", requireAuth, requireRole(Role.APP_ADMIN), async (_req, res, next) => {
  try { res.json(await withHostNames(await Listing.find({ status: "pending" }).sort({ createdAt: -1 }).lean())); }
  catch (error) { next(error); }
});

listingsRouter.get("/admin/all", requireAuth, requireRole(Role.APP_ADMIN), async (_req, res, next) => {
  try { res.json(await withHostNames(await Listing.find({}).sort({ createdAt: -1 }).lean())); }
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
