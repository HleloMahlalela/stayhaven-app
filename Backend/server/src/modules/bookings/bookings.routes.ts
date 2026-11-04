import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Booking } from "../../models/Booking.js";
import { Listing } from "../../models/Listing.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireRole } from "../../middleware/requireRole.js";
import { Role } from "../../db/models/enums.js";

export const bookingsRouter = Router();

bookingsRouter.post("/", requireAuth, requireRole(Role.GUEST), async (req, res, next) => {
  try {
    const input = z.object({
      listingId: z.string().min(1),
      checkInDate: z.coerce.date(),
      checkOutDate: z.coerce.date(),
      guests: z.number().int().min(1).max(10),
    }).parse(req.body);
    if (input.checkOutDate <= input.checkInDate) { res.status(400).json({ message: "Check-out must be after check-in" }); return; }
    if (!mongoose.isValidObjectId(input.listingId)) { res.status(404).json({ message: "Listing not found" }); return; }
    const listing = await Listing.findOne({ _id: input.listingId, status: "approved" });
    if (!listing) { res.status(404).json({ message: "Listing not found" }); return; }
    const overlap = await Booking.findOne({ listing: listing._id, status: { $in: ["pending", "confirmed"] }, checkInDate: { $lt: input.checkOutDate }, checkOutDate: { $gt: input.checkInDate } });
    if (overlap) { res.status(409).json({ message: "Listing is not available for those dates" }); return; }
    const nights = Math.max(1, Math.ceil((input.checkOutDate.getTime() - input.checkInDate.getTime()) / 86400000));
    const totalPrice = (listing.price * nights) - Math.floor(nights / (listing.discountInterval || 1)) * (listing.discount || 0);
    const booking = await Booking.create({ ...input, listing: listing._id, guest: req.user!.id, totalPrice });
    res.status(201).json(await Booking.findById(booking._id).populate("listing").populate("guest", "fullName email"));
  } catch (error) { next(error); }
});

bookingsRouter.get("/my-bookings", requireAuth, requireRole(Role.GUEST), async (req, res, next) => {
  try { res.json(await Booking.find({ guest: req.user!.id }).populate("listing").populate("guest", "fullName email").sort({ createdAt: -1 })); }
  catch (error) { next(error); }
});

bookingsRouter.get("/host-bookings", requireAuth, requireRole(Role.HOUSE_ADMIN), async (req, res, next) => {
  try {
    const listings = await Listing.find({ hostId: req.user!.id }).select("_id");
    res.json(await Booking.find({ listing: { $in: listings.map((item) => item._id) } }).populate("listing").populate("guest", "fullName email").sort({ createdAt: -1 }));
  } catch (error) { next(error); }
});

bookingsRouter.patch("/:id/status", requireAuth, requireRole(Role.HOUSE_ADMIN), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) { res.status(404).json({ message: "Booking not found" }); return; }
    const status = z.enum(["confirmed", "cancelled"]).parse(req.body.status);
    const booking = await Booking.findById(req.params.id).populate("listing");
    if (!booking) { res.status(404).json({ message: "Booking not found" }); return; }
    const listing = booking.listing as any;
    if (listing.hostId !== req.user!.id) { res.status(403).json({ message: "You do not own this listing" }); return; }
    booking.status = status;
    await booking.save();
    res.json(await booking.populate("guest", "fullName email"));
  } catch (error) { next(error); }
});
