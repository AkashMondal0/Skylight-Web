import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { comments, followers, likes, posts, users } from "../../../../../db/schema"
import jwt from "jsonwebtoken"
import { count, desc, eq, sql } from "drizzle-orm"
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

    const authorId = verify_id.id

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
        commentCount: count(eq(comments.postId, posts.id)),
        likeCount: count(eq(likes.postId, posts.id)),
        createdAt: posts.createdAt,
        alreadyLiked: eq(likes.authorId, authorId)
      },
      userData: {
          id: users.id,
          username: users.username,
          email: users.email,
          profileUrl: users.profilePicture,
      },
    })
      .from(followers)
      .where(eq(followers.followerUserId, authorId))
      .limit(12)
      .offset(0)
      .orderBy(desc(posts.createdAt))
      .leftJoin(posts, eq(followers.followingUserId, posts.authorId))
      .leftJoin(comments, eq(posts.id, comments.postId))
      .leftJoin(likes, eq(posts.id, likes.postId))
      .innerJoin(users, eq(posts.authorId, users.id))
      .groupBy(
        posts.id,
        users.id,
        posts.createdAt,
        followers.followingUserId,
        followers.createdAt,
        comments.postId,
        likes.postId,
        likes.authorId,
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