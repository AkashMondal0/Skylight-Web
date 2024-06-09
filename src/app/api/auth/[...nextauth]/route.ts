import redis from "@/lib/db/redis";
import NextAuth from "next-auth"
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers";
const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "SignUpWithCredentials",
      type: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        image: { label: "Image", type: "text" },
        id: { label: "ID", type: "text" },
        token: { label: "Token", type: "text" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.token) return null
          cookies().set({
            name: 'token-auth',
            value: credentials?.token,
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax"
          })
          const user = {
            username: credentials.username,
            name: credentials.name,
            email: credentials.email,
            profilePicture: credentials.image,
            id: credentials.id
          }
          await redis.hset(`session:${credentials?.id}`, user);
          return { ...credentials, profilePicture: credentials.image } as any
        } catch (error) {
          console.log("Error", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      if (token.user) {
        session.user = token.user as {
          id: string; // Change the type of id from number to string
          username: string;
          email: string;
          name: string;
        };
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        return {
          ...token,
          user: user,
        };
      }
      return token
    }
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: '/',
  },
}


const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
