import { NextResponse } from "next/server";
import { prisma } from "../../../src/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { status: "approved" },
    orderBy: { approvedAt: "desc" },
    take: 12,
    select: {
      id: true,
      name: true,
      company: true,
      role: true,
      rating: true,
      message: true,
      avatar: true,
    },
  });

  return NextResponse.json({ reviews });
}
