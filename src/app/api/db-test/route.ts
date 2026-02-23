import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await prisma.dealer.count();
    return NextResponse.json({ count, status: "connected" });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed", details: String(error) },
      { status: 500 }
    );
  }
}
