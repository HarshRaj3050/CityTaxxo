import { auth } from "../src/auth";
import { NextResponse } from "next/server";

export async function middleware(request: any) {
  const session = await auth();

  // Protect /user route and all sub-routes
  if (request.nextUrl.pathname.startsWith("/user")) {
    // If user is not authenticated, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/auth/register", request.url));
    }

    // If email is not verified, redirect to login
    if (!(session.user as any)?.isEmailVerified) {
      return NextResponse.redirect(new URL("/auth/register", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
  runtime: "nodejs",
};
