import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { prisma } from "../src/db/prisma.js";

const api = request(createApp());
const email = "auth.e2e@stayhaven.test";
const password = "Password123!";
const userAgentBypassIp = "198.51.100.";

async function loginFrom(ip: string, loginPassword = password) {
  return api
    .post("/api/v1/auth/login")
    .set("X-Forwarded-For", ip)
    .send({ email, password: loginPassword });
}

beforeAll(async () => {
  await prisma.session.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.emailVerificationToken.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("auth E2E", () => {
  it("registers a guest", async () => {
    const response = await api.post("/api/v1/auth/register").send({
      email,
      password,
      fullName: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.user.role).toBe("GUEST");
  });

  it("rejects wrong password", async () => {
    const response = await loginFrom(`${userAgentBypassIp}1`, "wrong");
    expect(response.status).toBe(401);
  });

  it("logs in and returns workspace", async () => {
    const response = await loginFrom(`${userAgentBypassIp}2`);

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeTruthy();
    expect(response.body.user.workspace).toBe("guest");
  });

  it("returns /me", async () => {
    const loginResponse = await loginFrom(`${userAgentBypassIp}3`);
    const response = await api
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${loginResponse.body.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(email);
  });

  it("rejects /me without token", async () => {
    const response = await api.get("/api/v1/auth/me");
    expect(response.status).toBe(401);
  });

  it("rate limits login", async () => {
    const ip = `${userAgentBypassIp}10`;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await loginFrom(ip, "wrong");
      expect(response.status).toBe(401);
    }

    const sixthResponse = await loginFrom(ip, "wrong");
    expect(sixthResponse.status).toBe(429);
  });

  it("refresh rotates and revokes on reuse", async () => {
    const loginResponse = await loginFrom(`${userAgentBypassIp}4`);
    const oldRefreshToken = loginResponse.body.refreshToken as string;

    const rotationResponse = await api
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: oldRefreshToken });
    expect(rotationResponse.status).toBe(200);
    const newRefreshToken = rotationResponse.body.refreshToken as string;
    expect(newRefreshToken).toBeTruthy();
    expect(newRefreshToken).not.toBe(oldRefreshToken);

    const reuseResponse = await api
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: oldRefreshToken });
    expect(reuseResponse.status).toBe(401);

    const revokedSessionResponse = await api
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: newRefreshToken });
    expect(revokedSessionResponse.status).toBe(401);
  });

  it("forgot-password for unknown email does not leak", async () => {
    const response = await api
      .post("/api/v1/auth/forgot-password")
      .send({ email: "unknown@stayhaven.test" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it("suspended user cannot log in", async () => {
    await prisma.user.update({
      where: { email },
      data: { status: "SUSPENDED" },
    });

    const response = await loginFrom(`${userAgentBypassIp}5`);
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe("ACCOUNT_SUSPENDED");
  });
});
