import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import db from "@/lib/db/drizzle";
import { followers, posts, users } from "../../../../../db/schema";
import { count, eq, like, or, desc, not, is, sql, exists } from "drizzle-orm";
const secret = process.env.NEXTAUTH_SECRET || "secret";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

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

    // get user profile
    const userProfile = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      profilePicture: users.profilePicture,
      bio: users.bio,
      isVerified: users.isVerified,
      isPrivate: users.isPrivate,
      postCount: count(eq(posts.authorId, users.id)),
      isFollowing: exists(db.select().from(followers).where(eq(followers.followingUserId, users.id))),
    })
      .from(users)
      .leftJoin(posts, eq(posts.authorId, users.id))
      .where(eq(users.email, params.id)) // <-------------
      .groupBy(users.id)
      .limit(1)

    if (!userProfile[0].id) {
      return Response.json({
        code: 0,
        message: "User not found",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }
    // get followers count
    const FollowersCount = await db.select({
      followersCount: count(eq(followers.followerUserId, userProfile[0].id)),
    })
      .from(followers)
      .where(eq(followers.followerUserId, userProfile[0].id))

    // get following count
    const FollowingCount = await db.select({
      followingCount: count(eq(followers.followingUserId, userProfile[0].id)),
    })
      .from(followers)
      .where(eq(followers.followingUserId, userProfile[0].id))

    // check if user is private
    if (!userProfile[0].isPrivate && userProfile[0].isFollowing) {
      // get post count
      const userPosts = await db.select()
        .from(posts)
        .where(eq(posts.authorId, userProfile[0].id))
        .limit(12)
        .offset(0)
        .orderBy(desc(posts.createdAt))

      return Response.json({
        code: 1,
        message: "User is private",
        status_code: 200,
        data: {
          ...userProfile[0],
          followersCount: FollowingCount[0].followingCount,
          followingCount: FollowersCount[0].followersCount,
          posts: userPosts
        }
      }, { status: 200 })
    } else {
      return Response.json({
        code: 1,
        message: "Data fetched successfully",
        status_code: 200,
        data: {
          ...userProfile[0],
          followersCount: FollowingCount[0].followingCount,
          followingCount: FollowersCount[0].followersCount,
          posts: []
        }
      }, { status: 200 })
    }
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