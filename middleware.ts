import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const role = (token.role || "").toLowerCase();

  if (url.pathname.startsWith("/signin") || url.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (url.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (url.pathname.startsWith("/lead") && role !== "lead" ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (
    url.pathname.startsWith("/projectlead") &&
    !["projectlead", "colead"].includes(role)
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (url.pathname.startsWith("/member") && !["member"].includes(role)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/admin/:path*",
    "/lead/:path*",
    "/projectlead/:path*",
    "/member/:path*",
  ],
};
