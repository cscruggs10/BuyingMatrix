import { prisma } from "@/lib/prisma";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=missing_token", request.url));
    }

    // Find the token in the database
    const magicLinkToken = await prisma.magicLinkToken.findUnique({
      where: { token },
      include: { dealer: true },
    });

    if (!magicLinkToken) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", request.url));
    }

    // Check if token is expired
    if (new Date() > magicLinkToken.expires_at) {
      return NextResponse.redirect(new URL("/login?error=expired_token", request.url));
    }

    // Check if token was already used
    if (magicLinkToken.used_at) {
      return NextResponse.redirect(new URL("/login?error=used_token", request.url));
    }

    // Mark token as used
    await prisma.magicLinkToken.update({
      where: { id: magicLinkToken.id },
      data: { used_at: new Date() },
    });

    // Create session token
    const sessionToken = await createSessionToken({
      dealerId: magicLinkToken.dealer.id,
      email: magicLinkToken.dealer.email,
    });

    // Set session cookie
    await setSessionCookie(sessionToken);

    // Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Error verifying magic link:", error);
    return NextResponse.redirect(new URL("/login?error=verification_failed", request.url));
  }
}
