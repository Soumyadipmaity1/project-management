import { NextResponse, NextRequest } from 'next/server'
 import { getToken } from "next-auth/jwt"
import { default } from 'next-auth/middleware';

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: ['/signin' ,
    '/signup',


  ],
}