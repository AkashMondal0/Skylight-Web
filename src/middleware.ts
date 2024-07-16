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
    "/profile/:path*",
    "/posts/:path*",
    "/post/:path*",
    "/explore/:path*",
    "/message/:path*",
    "/reels/:path*",
    "/search/:path*",
    "/accounts/:path*",
  ]
}