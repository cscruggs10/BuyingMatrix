import { prisma } from "@/lib/prisma";
import { generateMagicLinkToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if dealer exists
    const dealer = await prisma.dealer.findUnique({
      where: { email: normalizedEmail },
    });

    if (!dealer) {
      return NextResponse.json({ error: "No account found with this email" }, { status: 404 });
    }

    // Generate magic link token
    const token = generateMagicLinkToken();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store token in database
    await prisma.magicLinkToken.create({
      data: {
        dealer_id: dealer.id,
        token,
        expires_at: expiresAt,
      },
    });

    // Build magic link URL
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const magicLink = `${baseUrl}/api/auth/verify?token=${token}`;

    // Send email via Resend
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    await resend.emails.send({
      from: fromEmail,
      to: normalizedEmail,
      subject: "Your Buy Box Builder Login Link",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E3A5F;">Log in to Buy Box Builder</h2>
          <p>Hi ${dealer.full_name},</p>
          <p>Click the button below to log in to your Buy Box Builder account:</p>
          <div style="margin: 30px 0;">
            <a href="${magicLink}"
               style="background-color: #E8700A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
              Log In to Buy Box Builder
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">This link will expire in 15 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this login link, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px;">Buy Box Builder — Deal Machine / i Finance LLC</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending magic link:", error);
    return NextResponse.json({ error: "Failed to send login link" }, { status: 500 });
  }
}
