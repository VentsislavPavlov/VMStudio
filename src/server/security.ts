import { headers } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

const buckets = new Map<string, { count: number; resetAt: number }>();

export const sanitizeText = (value: string) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim();

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const getClientKey = async () => {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headerStore.get("x-real-ip");
  return forwardedFor || realIp || "unknown";
};

export const assertRateLimit = async (scope: string, limit = 5, windowMs = 60_000) => {
  const key = `${scope}:${await getClientKey()}`;
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    throw new Error("Too many requests. Please try again later.");
  }

  bucket.count += 1;
};

export const verifyTurnstileToken = async (token?: string | null) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return true;
  }

  if (!token) {
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
};

export const verifyPassword = (candidate: string, expected: string) => {
  const candidateHash = createHash("sha256").update(candidate).digest();
  const expectedHash = createHash("sha256").update(expected).digest();

  return timingSafeEqual(candidateHash, expectedHash);
};
