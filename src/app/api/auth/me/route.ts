import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const dealer = await prisma.dealer.findUnique({
      where: { id: session.dealerId },
      select: {
        id: true,
        full_name: true,
        dealership_name: true,
        email: true,
        city: true,
        state: true,
        dealer_type: true,
      },
    });

    if (!dealer) {
      return NextResponse.json({ error: "Dealer not found" }, { status: 404 });
    }

    return NextResponse.json({ dealer });
  } catch (error) {
    console.error("Error getting current user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
