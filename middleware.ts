import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const allowedOrigins = ["https://workpilot-f.onrender.com"];

function buildCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin") || allowedOrigins[0];
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  } as Record<string, string>;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Early handle API CORS so API routes (including next-auth) always get the proper headers
  if (url.pathname.startsWith("/api")) {
    const method = request.method || "GET";
    const corsHeaders = buildCorsHeaders(request);

    // Preflight
    if (method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: corsHeaders });
    }

    // For actual API requests, continue but attach the CORS headers in the response
    const res = NextResponse.next();
    for (const [k, v] of Object.entries(corsHeaders)) {
      res.headers.set(k, v);
    }
    return res;
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

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
    "/api/:path*",
  ],
};
