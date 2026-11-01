import { z } from "zod";

export const CreateListingSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  location: z.string().trim().min(1),
  price: z.number().finite().nonnegative(),
  images: z.array(z.string()).default([]),
  amenities: z.array(z.string()).optional().default([]),
  discount: z.number().finite().min(0).optional().default(0),
});
