import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../dist/db/models/User.js";
import { Role, UserStatus } from "../dist/db/models/enums.js";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");

const seedUsers = [
  { email: "admin@stayhaven.com", password: "admin123", role: Role.APP_ADMIN, fullName: "StayHaven Admin" },
  { email: "guest@stayhaven.com", password: "guest123", role: Role.GUEST, fullName: "Test Guest" },
  { email: "house@stayhaven.com", password: "house123", role: Role.HOUSE_ADMIN, fullName: "House Admin" },
];

try {
  await mongoose.connect(uri);
  for (const user of seedUsers) {
    const passwordHash = await bcrypt.hash(user.password, 12);
    const { password: _plainPassword, ...userFields } = user;
    await User.updateOne(
      { email: user.email },
      { $set: { ...userFields, passwordHash, status: UserStatus.ACTIVE, emailVerifiedAt: new Date() } },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );
  }
  console.log("Seeded App Admin, Guest, and House Admin accounts.");
} finally {
  await mongoose.disconnect();
}
