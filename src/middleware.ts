import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Extract the 'skylight-token' cookie from the request
  const token = req.cookies.get('skylight-token');

  // Check if the token is present
  if (!token) {
    // redirect to the login page if the token is not present
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // If the token exists, allow the request to proceed
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/",
    "/explore/:path*",
    "/message/:path*",
    "/reels/:path*",
    "/search/:path*",
    "/account/:path*",
    "/notification/:path*",
  ]
}