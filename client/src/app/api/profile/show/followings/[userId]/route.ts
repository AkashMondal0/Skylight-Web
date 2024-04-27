import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { followers, users } from "../../../../../../../db/schema"
import { and, eq, exists, sql } from "drizzle-orm"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
const secret = process.env.NEXTAUTH_SECRET || "secret";
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const token = request.cookies.get("token-auth")

    if (!token) {
      return redirect("/auth/error")
    }

    const verify = jwt.verify(token.value, secret) as { email: string, id: string }

    if (!verify?.id) {
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }
    const skip = request.nextUrl.searchParams.get("skip")
    const size = request.nextUrl.searchParams.get("size")

    const Followers = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      profilePicture: users.profilePicture,
      bio: users.bio,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      isVerified: users.isVerified,
      isPrivate: users.isPrivate,
      isFollowing: exists(db.select().from(followers).where(and(
        eq(followers.followingUserId, verify.id),
        eq(followers.followerUserId, users.id)
      )))
    })
      .from(followers)
      .where(eq(followers.followerUserId, params.userId))
      .leftJoin(users, eq(followers.followingUserId, users.id))
      .limit(Number(size))
      .offset(Number(skip))

    return Response.json({
      code: 1,
      message: "User Post Fetch Successfully",
      status_code: 200,
      data: Followers
    }, { status: 200 })
  } catch (error) {
    return Response.json({
      code: 0,
      message: "Internal server error",
      status_code: 500,
      data: {}
    }, { status: 500 })
  }
}