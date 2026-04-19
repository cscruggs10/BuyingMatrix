import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ dealerId: string }> }
) {
  try {
    const { dealerId } = await params;

    const dealer = await prisma.dealer.findUnique({
      where: { id: dealerId },
      select: {
        id: true,
        dealership_name: true,
        city: true,
        state: true,
        dealer_type: true,
        email: true,
        phone: true,
        entries: {
          include: { tiers: true },
          orderBy: { updated_at: "desc" },
        },
      },
    });

    if (!dealer) {
      return NextResponse.json({ error: "Dealer not found" }, { status: 404 });
    }

    return NextResponse.json({ dealer });
  } catch (error) {
    console.error("Error fetching public buy box:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
