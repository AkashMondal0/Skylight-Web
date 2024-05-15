import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { count, eq, desc, exists, and, countDistinct } from "drizzle-orm";
import { followers, posts, users, comments, likes } from '@/lib/db/schema';
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest, response: NextResponse) {
  try {

    const token = request.headers.get("authorization") ||  request.cookies.get("token-auth")?.value
    if (!token) {
      return Response.json({
        code: 0,
        message: "Token not found",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    let verify_id = jwt.verify(token, secret) as { email: string, id: string } as any

    verify_id = verify_id.id // logged user id

    if (!verify_id) {
      console.log("Invalid token")
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }
    // profile verification
    const data = await db.select({
      id: posts.id,
      caption: posts.caption,
      fileUrl: posts.fileUrl,
      commentCount: count(eq(comments.postId, posts.id)),
      likeCount: countDistinct(eq(likes.postId, posts.id)),
      createdAt: posts.createdAt,
      alreadyLiked: exists(db.select().from(likes).where(and(
        eq(likes.authorId, verify_id),
        eq(likes.postId, posts.id)
      ))),
      authorData: {
        id: users.id,
        username: users.username,
        email: users.email,
        profilePicture: users.profilePicture,
      },
    })
      .from(followers)
      .where(eq(followers.followerUserId, verify_id))
      .limit(12)
      .offset(0)
      .orderBy(desc(posts.createdAt))
      .leftJoin(posts, eq(followers.followingUserId, posts.authorId))
      .leftJoin(comments, eq(posts.id, comments.postId))
      .leftJoin(likes, eq(posts.id, likes.postId))
      .leftJoin(users, eq(posts.authorId, users.id))
      .groupBy(
        posts.id,
        users.id,
        // posts.createdAt,
        // followers.followingUserId,
        // followers.createdAt,
        // comments.postId,
        // likes.postId,
      )

    // console.log(data,"data")

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