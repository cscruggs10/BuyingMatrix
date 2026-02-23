import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { DealerType } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { full_name, dealership_name, email, phone, city, state, dealer_type } = body;

    // Server-side validation
    if (!full_name?.trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!dealership_name?.trim()) {
      return NextResponse.json({ error: "Dealership name is required" }, { status: 400 });
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!phone?.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!city?.trim()) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }
    if (!state?.trim()) {
      return NextResponse.json({ error: "State is required" }, { status: 400 });
    }
    if (!dealer_type || !Object.values(DealerType).includes(dealer_type)) {
      return NextResponse.json({ error: "Valid dealer type is required" }, { status: 400 });
    }

    // Check for existing email
    const existingDealer = await prisma.dealer.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingDealer) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Create dealer
    const dealer = await prisma.dealer.create({
      data: {
        full_name: full_name.trim(),
        dealership_name: dealership_name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        city: city.trim(),
        state: state.trim().toUpperCase(),
        dealer_type: dealer_type as DealerType,
      },
    });

    return NextResponse.json({
      success: true,
      dealer: {
        id: dealer.id,
        email: dealer.email,
        full_name: dealer.full_name,
        dealership_name: dealer.dealership_name,
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating dealer:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
