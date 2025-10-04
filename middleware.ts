import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  // if (
  //   token &&
  //   (url.pathname.startsWith("/signin") || url.pathname.startsWith("/signup"))
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // if (url.pathname.startsWith("/admin") && token.role !== "Admin") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // if (url.pathname.startsWith("/team") && token.role !== "Lead") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/admin/:path*",   
    "/lead/:path*",    
  ],
};
