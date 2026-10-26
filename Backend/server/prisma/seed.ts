import { prisma } from "../src/db/prisma.js";
import { hashPassword } from "../src/lib/password.js";

const sharedPassword = "Password123!";

const seedUsers = [
  { email: "admin@stayhaven.test", role: "APP_ADMIN", fullName: "Platform Admin" },
  { email: "amara@stayhaven.test", role: "HOUSE_ADMIN", fullName: "Amara Nakato" },
  { email: "sarah@stayhaven.test", role: "HOUSE_ADMIN", fullName: "Sarah Kato" },
  { email: "david@stayhaven.test", role: "HOUSE_ADMIN", fullName: "David Muwanga" },
  { email: "maya@stayhaven.test", role: "GUEST", fullName: "Maya Thompson" },
  { email: "daniel@stayhaven.test", role: "GUEST", fullName: "Daniel Kim" },
] as const;

async function main(): Promise<void> {
  const passwordHash = await hashPassword(sharedPassword);
  const now = new Date();

  for (const user of seedUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        passwordHash,
        fullName: user.fullName,
        role: user.role,
        status: "ACTIVE",
        emailVerifiedAt: now,
      },
      create: {
        ...user,
        passwordHash,
        status: "ACTIVE",
        emailVerifiedAt: now,
      },
    });
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
  await prisma.$disconnect();
}
