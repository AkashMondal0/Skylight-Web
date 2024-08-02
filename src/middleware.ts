import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/auth/login',
    error: '/error',
  }
})

export const config = {
  matcher: [
    "/",
    "/explore/:path*",
    "/message/:path*",
    "/reels/:path*",
    "/search/:path*",
    "/accounts/:path*",
  ]
}