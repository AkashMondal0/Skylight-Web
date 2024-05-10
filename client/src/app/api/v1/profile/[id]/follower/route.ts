import { and, eq, exists } from 'drizzle-orm';
import db from "@/lib/db/drizzle"
import { NextRequest } from "next/server"
import { followers, users } from "@/lib/db/schema"
import jwt from "jsonwebtoken"
const secret = process.env.NEXTAUTH_SECRET || "secret";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  try {
    const token = request.headers.get("authorization")

    if (!token) {
      return Response.json({
        code: 0,
        message: "Unauthorized",
        status_code: 401,
        data: {}
      }, { status: 401 })
    }

    const verify = jwt.verify(token, secret) as { email: string, id: string }

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
      name: users.name,
      isFollowing: exists(db.select().from(followers).where(and(
        eq(followers.followerUserId, verify.id),
        eq(followers.followingUserId, users.id)
      )))
    })
      .from(followers)
      .where(eq(followers.followingUserId, params.id)) // <------------- user id
      .leftJoin(users, eq(followers.followerUserId, users.id))
      .limit(Number(size))
      .offset(Number(skip))

    return Response.json({
      code: 1,
      message: "User Post Fetch Successfully",
      status_code: 200,
      data: Followers
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({
      code: 0,
      message: "Internal server error",
      status_code: 500,
      data: {}
    }, { status: 500 })
  }
  
}