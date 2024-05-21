import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import db from "@/lib/db/drizzle";
import { comments, followers, likes, posts, users } from "@/lib/db/schema";
import { count, eq, like, or, desc, not, is, sql, exists, and, asc, countDistinct } from "drizzle-orm";
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
      console.log("Invalid token")
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    // profile verification

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
      isFollowing: exists(db.select().from(followers).where(and(
        and(
          eq(followers.followerUserId, verify.id),
          eq(followers.followingUserId, users.id)
        )
      )))
    })
      .from(users)
      .leftJoin(posts, eq(posts.authorId, users.id))
      .where(eq(users.username, params.id)) // <-------------
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

    // get post count
    const userPosts = await db.select({
      id: posts.id,
      authorId: posts.authorId,
      fileUrl: posts.fileUrl,
      likeCount: countDistinct(eq(likes.postId, posts.id)),
      commentCount: count(eq(comments.postId, posts.id)),
      createdAt: posts.createdAt
    })
      .from(posts)
      .where(eq(posts.authorId, userProfile[0].id))
      .leftJoin(likes, eq(likes.postId, posts.id))
      .leftJoin(comments, eq(comments.postId, posts.id))
      .groupBy(
        posts.id,
        likes.postId,
        comments.postId
      )
      .limit(12)
      .offset(0)
      .orderBy(desc(posts.createdAt))

    return Response.json({
      code: 1,
      message: "User profile fetched successfully",
      status_code: 200,
      data: {
        ...userProfile[0],
        followersCount: FollowingCount[0].followingCount,
        followingCount: FollowersCount[0].followersCount,
        posts: userPosts ?? [],
      }
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

