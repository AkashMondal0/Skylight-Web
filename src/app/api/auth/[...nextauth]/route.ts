import NextAuth from "next-auth"
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
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
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) return null
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
      return url.startsWith(baseUrl)
      ? Promise.resolve(url)
      : Promise.resolve(baseUrl)
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
    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {
      if (trigger === 'update') {
        token.user = session
      }
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
