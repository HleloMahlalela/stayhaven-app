import "dotenv/config";
import mongoose from "mongoose";
import { Role, UserStatus } from "./models/enums.js";
import { User } from "./models/User.js";
import { connectToMongoDB } from "./mongoose.js";
import { hashPassword } from "../lib/password.js";

const sharedPassword = "Password123!";

const seedUsers = [
  { email: "admin@stayhaven.test", role: Role.APP_ADMIN, fullName: "Platform Admin" },
  { email: "amara@stayhaven.test", role: Role.HOUSE_ADMIN, fullName: "Amara Nakato" },
  { email: "sarah@stayhaven.test", role: Role.HOUSE_ADMIN, fullName: "Sarah Kato" },
  { email: "david@stayhaven.test", role: Role.HOUSE_ADMIN, fullName: "David Muwanga" },
  { email: "maya@stayhaven.test", role: Role.GUEST, fullName: "Maya Thompson" },
  { email: "daniel@stayhaven.test", role: Role.GUEST, fullName: "Daniel Kim" },
] as const;

async function main(): Promise<void> {
  await connectToMongoDB();

  const passwordHash = await hashPassword(sharedPassword);
  const now = new Date();

  for (const user of seedUsers) {
    await User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          ...user,
          passwordHash,
          status: UserStatus.ACTIVE,
          emailVerifiedAt: now,
        },
      },
      { upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true },
    );
  }

  console.table(seedUsers.map(({ email, role, fullName }) => ({
    email,
    role,
    fullName,
    password: sharedPassword,
  })));
  console.log("All seeded users share the password: Password123!");
}

try {
  await main();
} finally {
  await mongoose.disconnect();
}
