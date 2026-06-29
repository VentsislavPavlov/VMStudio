import { cookies } from "next/headers";
import { createHash } from "crypto";
import { verifyPassword } from "./security";

export const ADMIN_COOKIE = "vm_admin";

const adminToken = () => {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not configured.");
  }

  return createHash("sha256").update(password).digest("hex");
};

export const isAdminAuthenticated = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === adminToken();
};

export const requireAdmin = async () => {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
};

export const setAdminSession = async (password: string) => {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || !verifyPassword(password, expected)) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  return true;
};

export const clearAdminSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
};
