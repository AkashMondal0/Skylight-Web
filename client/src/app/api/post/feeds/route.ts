import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { comments, followers, likes, posts, users } from "../../../../../db/schema"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import { desc, eq, sql } from "drizzle-orm"
const secret = process.env.NEXTAUTH_SECRET || "secret";


export async function GET(request: NextRequest, response: NextResponse) {
  try {

    const token = request.cookies.get("token-auth")

    if (!token) {
      return Response.json({
        code: 0,
        message: "Token not found",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    let verify_id = jwt.verify(token.value, secret) as { email: string, id: string } as any

    verify_id = verify_id.id

    if (!verify_id) {
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    const data = await db.select({
      id: followers.followingUserId,
      post: {
        id: posts.id,
        caption: posts.caption,
        fileUrl: posts.fileUrl,
        commentCount: sql`COUNT(${comments.id})`,
        likeCount: sql`COUNT(${likes.id})`,
        alreadyLiked: eq(likes.authorId, verify_id)
      },
      userData: {
        id: users.id,
        username: users.username,
        email: users.email,
        profileUrl: users.profilePicture,
      },
    })
      .from(followers)
      .where(eq(followers.followerUserId, verify_id))
      .limit(12)
      .offset(0)
      .orderBy(desc(followers.createdAt))
      .fullJoin(posts, eq(followers.followingUserId, posts.authorId))
      .leftJoin(comments, eq(posts.id, comments.postId))
      .leftJoin(likes, eq(posts.id, likes.postId))
      .innerJoin(users, eq(posts.authorId, users.id))
      .groupBy(
        posts.id,
        users.id,
        followers.followingUserId,
        followers.followerUserId,
        followers.createdAt,
        followers.updatedAt,
        followers.id,
        comments.id,
        likes.id,
      )


    return NextResponse.json({
      code: 1,
      message: "post Fetched Successfully",
      status_code: 200,
      data: data
    }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      code: 0,
      message: "Internal server error",
      status_code: 500,
      data: {}
    }, { status: 500 })
  }
}