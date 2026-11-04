import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { requireAuth } from "../../middleware/requireAuth.js";
import { Role } from "../../db/models/enums.js";
import { Listing } from "../../models/Listing.js";
import { Booking } from "../../models/Booking.js";
import { Message } from "../../models/Message.js";
import { Thread } from "../../models/Thread.js";

export const messagesRouter = Router();
messagesRouter.use(requireAuth);

function isMongoObjectId(value: unknown): value is string {
  return typeof value === "string" && mongoose.isObjectIdOrHexString(value);
}

function participantQuery(userId: string, role: Role) {
  return role === Role.GUEST ? { guestId: userId } : role === Role.HOUSE_ADMIN ? { houselisterId: userId } : null;
}

async function populateThread(thread: any) {
  return thread.populate([
    { path: "guestId", select: "fullName" },
    { path: "houselisterId", select: "fullName" },
    { path: "listingId", select: "title location hostId" },
    { path: "bookingId", select: "checkInDate checkOutDate" },
  ]);
}

messagesRouter.post("/threads", async (req, res, next) => {
  try {
    if (req.user!.role !== Role.GUEST) { res.status(403).json({ message: "Only guests can start a conversation." }); return; }
    const input = z.object({
      listingId: z.string().refine(isMongoObjectId, "listingId must be a valid MongoDB ObjectId"),
      bookingId: z.string().refine(isMongoObjectId, "bookingId must be a valid MongoDB ObjectId").optional(),
    }).parse(req.body);
    const listing = await Listing.findById(input.listingId);
    if (!listing) { res.status(404).json({ message: "Listing not found." }); return; }
    let bookingId: mongoose.Types.ObjectId | undefined;
    if (input.bookingId) {
      const booking = await Booking.findOne({ _id: input.bookingId, listing: listing._id, guest: req.user!.id });
      if (!booking) { res.status(404).json({ message: "Booking not found." }); return; }
      bookingId = booking._id;
    }
    const thread = await Thread.findOneAndUpdate(
      { guestId: req.user!.id, houselisterId: listing.hostId, listingId: listing._id },
      { $setOnInsert: { guestId: req.user!.id, houselisterId: listing.hostId, listingId: listing._id, lastMessageAt: new Date() }, ...(bookingId ? { $set: { bookingId } } : {}) },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
    res.status(200).json(await populateThread(thread));
  } catch (error) { next(error); }
});

messagesRouter.get("/threads", async (req, res, next) => {
  try {
    const query = participantQuery(req.user!.id, req.user!.role);
    if (!query) { res.status(403).json({ message: "Messages are unavailable for this role." }); return; }
    const threads = await Thread.find(query).sort({ lastMessageAt: -1 }).populate([
      { path: "guestId", select: "fullName" },
      { path: "houselisterId", select: "fullName" },
      { path: "listingId", select: "title location hostId" },
      { path: "bookingId", select: "checkInDate checkOutDate" },
    ]).lean();
    const ids = threads.map((thread) => thread._id);
    const latest = await Message.aggregate([
      { $match: { threadId: { $in: ids } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$threadId", body: { $first: "$body" }, createdAt: { $first: "$createdAt" } } },
    ]);
    const previews = new Map(latest.map((message) => [String(message._id), { body: message.body, createdAt: message.createdAt }]));
    res.json(threads.map((thread) => ({ ...thread, lastMessage: previews.get(String(thread._id)) || null })));
  } catch (error) { next(error); }
});

messagesRouter.get("/threads/:id", async (req, res, next) => {
  try {
    if (!isMongoObjectId(req.params.id)) { res.status(400).json({ message: "Conversation ID must be a valid MongoDB ObjectId." }); return; }
    const query = participantQuery(req.user!.id, req.user!.role);
    if (!query) { res.status(403).json({ message: "Messages are unavailable for this role." }); return; }
    const thread = await Thread.findOne({ _id: req.params.id, ...query });
    if (!thread) { res.status(404).json({ message: "Conversation not found." }); return; }
    const messages = await Message.find({ threadId: thread._id }).sort({ createdAt: 1 }).lean();
    res.json({ thread: await populateThread(thread), messages });
  } catch (error) { next(error); }
});

messagesRouter.post("/threads/:id/messages", async (req, res, next) => {
  try {
    if (!isMongoObjectId(req.params.id)) { res.status(400).json({ message: "Conversation ID must be a valid MongoDB ObjectId." }); return; }
    if (![Role.GUEST, Role.HOUSE_ADMIN].includes(req.user!.role)) { res.status(403).json({ message: "Messages are unavailable for this role." }); return; }
    const input = z.object({ body: z.string().trim().min(1).max(5000) }).parse(req.body);
    const thread = await Thread.findOne({ _id: req.params.id, ...(req.user!.role === Role.GUEST ? { guestId: req.user!.id } : { houselisterId: req.user!.id }) });
    if (!thread) { res.status(404).json({ message: "Conversation not found." }); return; }
    const senderRole = req.user!.role === Role.GUEST ? Role.GUEST : Role.HOUSE_ADMIN;
    const message = await Message.create({ threadId: thread._id, senderId: req.user!.id, senderRole, listingId: thread.listingId, ...(thread.bookingId ? { bookingId: thread.bookingId } : {}), body: input.body });
    thread.lastMessageAt = message.createdAt;
    await thread.save();
    res.status(201).json(message);
  } catch (error) { next(error); }
});
