import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");

const seedUsers = [
  { email: "admin@stayhaven.com", password: "admin123", role: "APP_ADMIN", fullName: "StayHaven Admin" },
  { email: "guest@stayhaven.com", password: "guest123", role: "GUEST", fullName: "Test Guest" },
  { email: "house@stayhaven.com", password: "house123", role: "HOUSE_ADMIN", fullName: "House Admin" },
];

try {
  await mongoose.connect(uri);
  for (const user of seedUsers) {
    const password = await bcrypt.hash(user.password, 12);
    await User.updateOne({ email: user.email }, { $set: { ...user, password } }, { upsert: true, runValidators: true });
  }
  console.log("Seeded App Admin, Guest, and House Admin accounts.");
} finally {
  await mongoose.disconnect();
}
