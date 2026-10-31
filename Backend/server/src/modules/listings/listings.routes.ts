import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma.js";
import { requireAuth } from "../../middleware/requireAuth.js";

export const listingsRouter = Router();

const CreateListingSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  location: z.string().trim().min(1),
  price: z.number().finite().nonnegative(),
  currency: z.string().trim().min(1).default("BWP"),
  discount: z.number().finite().min(0).default(0),
  images: z.array(z.string().url()).default([]),
});

listingsRouter.get("/", async (req, res, next) => {
  try {
    const location = typeof req.query.location === "string" ? req.query.location : undefined;
    const listings = await prisma.listing.findMany({
      where: {
        status: "APPROVED",
        ...(location ? { location: { contains: location, mode: "insensitive" } } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(listings);
  } catch (error) {
    next(error);
  }
});

listingsRouter.get("/:id", async (req, res, next) => {
  try {
    const listing = await prisma.listing.findFirst({
      where: { id: req.params.id, status: "APPROVED" },
    });
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
    const listing = await prisma.listing.create({
      data: { ...input, hostId: req.user.id, status: "PENDING" },
    });
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
});
