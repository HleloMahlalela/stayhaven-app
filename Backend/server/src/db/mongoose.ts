import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectToMongoDB(): Promise<typeof mongoose> {
  return mongoose.connect(env.MONGODB_URI);
}
