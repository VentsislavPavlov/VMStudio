import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews: [] });
  }

  const { prisma } = await import("../../../src/server/db");

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
