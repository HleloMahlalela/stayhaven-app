import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { Listing } from "./models/Listing.js";

const app = express();
app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true, database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.get("/api/listings", async (_req, res, next) => {
  try { res.json(await Listing.find({ status: "approved" }).sort({ createdAt: -1 })); } catch (error) { next(error); }
});
app.get("/api/listings/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid listing ID" });
    const listing = await Listing.findOne({ _id: req.params.id, status: "approved" });
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (error) { next(error); }
});

const port = Number(process.env.PORT) || 4000;
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);
app.listen(port, () => console.log(`StayHaven backend running on http://localhost:${port} (MongoDB connected)`));
