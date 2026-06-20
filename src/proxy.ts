import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const proxy = auth((req: NextRequest & { auth: any }) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;

  if (!session?.user) {
    return NextResponse.redirect(
      new URL("/auth/register", req.url)
    );
  }

  if (!session.user.isEmailVerified) {
    return NextResponse.redirect(
      new URL("/auth/register", req.url)
    );
  }

  const role = session.user.role;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(
      new URL("/auth/register", req.url)
    );
  }

  if (pathname.startsWith("/partner")) {
    if(pathname.startsWith("/partner/onboarding") && (role == "user")){
      return NextResponse.next();
    }
    if(role !== "partner"){
      return NextResponse.redirect(
        new URL("/auth/register", req.url)
      );
    }
  }

  return NextResponse.next();
});

export default proxy;

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/partner/:path*",
  ],
};