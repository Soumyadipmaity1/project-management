import { NextResponse, NextRequest } from 'next/server'
 import { getToken } from "next-auth/jwt"
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request});
  const url = request.nextUrl;

  if(token &&
      (
        url.pathname.startsWith('/signin')
        || url.pathname.startsWith('/signup')
      )
  ){
      return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: ['/signin' ,
    '/signup',
    '/signup'

  ],
}