import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const entries = await prisma.buyBoxEntry.findMany({
      where: { dealer_id: session.dealerId },
      include: { tiers: true },
      orderBy: { updated_at: "desc" },
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching buy box entries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { make, model, year_min, year_max, generation_label, tiers } = body;

    if (!make?.trim())
      return NextResponse.json({ error: "Make is required" }, { status: 400 });
    if (!model?.trim())
      return NextResponse.json(
        { error: "Model is required" },
        { status: 400 }
      );
    if (year_min == null || year_max == null)
      return NextResponse.json(
        { error: "Year range is required" },
        { status: 400 }
      );
    if (isNaN(Number(year_min)) || isNaN(Number(year_max)))
      return NextResponse.json(
        { error: "Year values must be numbers" },
        { status: 400 }
      );
    if (Number(year_min) > Number(year_max))
      return NextResponse.json(
        { error: "Min year cannot exceed max year" },
        { status: 400 }
      );
    if (!generation_label?.trim())
      return NextResponse.json(
        { error: "Generation label is required" },
        { status: 400 }
      );
    if (!Array.isArray(tiers) || tiers.length === 0)
      return NextResponse.json(
        { error: "At least one tier is required" },
        { status: 400 }
      );

    for (const tier of tiers) {
      if (tier.mileage_max == null || tier.max_price == null) {
        return NextResponse.json(
          { error: "Each tier must have mileage_max and max_price" },
          { status: 400 }
        );
      }
      if (
        tier.mileage_min != null &&
        Number(tier.mileage_min) >= Number(tier.mileage_max)
      ) {
        return NextResponse.json(
          { error: "Mileage min must be less than mileage max" },
          { status: 400 }
        );
      }
      if (Number(tier.max_price) <= 0) {
        return NextResponse.json(
          { error: "Max price must be greater than 0" },
          { status: 400 }
        );
      }
    }

    const entry = await prisma.buyBoxEntry.create({
      data: {
        dealer_id: session.dealerId,
        make: make.trim(),
        model: model.trim(),
        year_min: Number(year_min),
        year_max: Number(year_max),
        generation_label: generation_label.trim(),
        tiers: {
          create: tiers.map(
            (t: {
              mileage_min?: number;
              mileage_max: number;
              max_price: number;
            }) => ({
              mileage_min: Number(t.mileage_min ?? 0),
              mileage_max: Number(t.mileage_max),
              max_price: Number(t.max_price),
            })
          ),
        },
      },
      include: { tiers: true },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error("Error creating buy box entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { id, make, model, year_min, year_max, generation_label, tiers } =
      body;

    if (!id)
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 }
      );
    if (!make?.trim())
      return NextResponse.json({ error: "Make is required" }, { status: 400 });
    if (!model?.trim())
      return NextResponse.json(
        { error: "Model is required" },
        { status: 400 }
      );
    if (year_min == null || year_max == null)
      return NextResponse.json(
        { error: "Year range is required" },
        { status: 400 }
      );
    if (isNaN(Number(year_min)) || isNaN(Number(year_max)))
      return NextResponse.json(
        { error: "Year values must be numbers" },
        { status: 400 }
      );
    if (Number(year_min) > Number(year_max))
      return NextResponse.json(
        { error: "Min year cannot exceed max year" },
        { status: 400 }
      );
    if (!generation_label?.trim())
      return NextResponse.json(
        { error: "Generation label is required" },
        { status: 400 }
      );
    if (!Array.isArray(tiers) || tiers.length === 0)
      return NextResponse.json(
        { error: "At least one tier is required" },
        { status: 400 }
      );

    for (const tier of tiers) {
      if (tier.mileage_max == null || tier.max_price == null) {
        return NextResponse.json(
          { error: "Each tier must have mileage_max and max_price" },
          { status: 400 }
        );
      }
      if (
        tier.mileage_min != null &&
        Number(tier.mileage_min) >= Number(tier.mileage_max)
      ) {
        return NextResponse.json(
          { error: "Mileage min must be less than mileage max" },
          { status: 400 }
        );
      }
      if (Number(tier.max_price) <= 0) {
        return NextResponse.json(
          { error: "Max price must be greater than 0" },
          { status: 400 }
        );
      }
    }

    const existing = await prisma.buyBoxEntry.findUnique({ where: { id } });
    if (!existing)
      return NextResponse.json(
        { error: "Entry not found" },
        { status: 404 }
      );
    if (existing.dealer_id !== session.dealerId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const entry = await prisma.$transaction(async (tx: typeof prisma) => {
      await tx.buyBoxTier.deleteMany({ where: { entry_id: id } });
      return tx.buyBoxEntry.update({
        where: { id },
        data: {
          make: make.trim(),
          model: model.trim(),
          year_min: Number(year_min),
          year_max: Number(year_max),
          generation_label: generation_label.trim(),
          tiers: {
            create: tiers.map(
              (t: {
                mileage_min?: number;
                mileage_max: number;
                max_price: number;
              }) => ({
                mileage_min: Number(t.mileage_min ?? 0),
                mileage_max: Number(t.mileage_max),
                max_price: Number(t.max_price),
              })
            ),
          },
        },
        include: { tiers: true },
      });
    });

    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Error updating buy box entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 }
      );

    const existing = await prisma.buyBoxEntry.findUnique({ where: { id } });
    if (!existing)
      return NextResponse.json(
        { error: "Entry not found" },
        { status: 404 }
      );
    if (existing.dealer_id !== session.dealerId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await prisma.buyBoxEntry.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting buy box entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
