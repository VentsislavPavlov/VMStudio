"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../src/server/db";
import { clearAdminSession, requireAdmin, setAdminSession } from "../../../src/server/admin-auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await setAdminSession(password);

  if (!ok) {
    redirect("/admin/reviews?error=1");
  }

  redirect("/admin/reviews");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/reviews");
}

export async function approveReview(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.review.update({
      where: { id },
      data: {
        status: "approved",
        approvedAt: new Date(),
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

export async function rejectReview(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.review.update({
      where: { id },
      data: {
        status: "rejected",
        approvedAt: null,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.review.delete({ where: { id } });
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
}
