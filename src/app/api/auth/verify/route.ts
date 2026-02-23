import { prisma } from "@/lib/prisma";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

function getBaseUrl(): string {
  const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN;
  if (railwayDomain) {
    return `https://${railwayDomain}`;
  }
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl();

  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/login?error=missing_token`);
    }

    // Find the token in the database
    const magicLinkToken = await prisma.magicLinkToken.findUnique({
      where: { token },
      include: { dealer: true },
    });

    if (!magicLinkToken) {
      return NextResponse.redirect(`${baseUrl}/login?error=invalid_token`);
    }

    // Check if token is expired
    if (new Date() > magicLinkToken.expires_at) {
      return NextResponse.redirect(`${baseUrl}/login?error=expired_token`);
    }

    // Check if token was already used
    if (magicLinkToken.used_at) {
      return NextResponse.redirect(`${baseUrl}/login?error=used_token`);
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
    return NextResponse.redirect(`${baseUrl}/dashboard`);
  } catch (error) {
    console.error("Error verifying magic link:", error);
    return NextResponse.redirect(`${baseUrl}/login?error=verification_failed`);
  }
}
