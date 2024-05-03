import PostItem from "./PostCard";
import { cookies } from 'next/headers';
import { count, eq, desc } from "drizzle-orm";
import { notFound, redirect } from 'next/navigation';
import jwt from "jsonwebtoken"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import { followers, posts, users, comments, likes } from '@/lib/db/schema';
import db from '@/lib/db/drizzle';


export default async function FeedsPage() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const token = cookies().get("token-auth")

    if (!token) {
      return redirect("/auth/login")
    }

    let verify_id = jwt.verify(token.value, secret) as { email: string, id: string } as any

    const authorId = verify_id.id

    if (!verify_id) {
      return redirect("/auth/login")
    }

    const data = await db.select({
      // id: followers.followingUserId,
      // post: {
      id: posts.id,
      caption: posts.caption,
      fileUrl: posts.fileUrl,
      commentCount: count(eq(comments.postId, posts.id)),
      likeCount: count(eq(likes.postId, posts.id)),
      createdAt: posts.createdAt,
      alreadyLiked: eq(likes.authorId, authorId),
      // },
      authorData: {
        id: users.id,
        username: users.username,
        email: users.email,
        profilePicture: users.profilePicture,
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

    if (data.length === 0) {
      return <>No Feeds</>
    }
    return (
      <div>
        {data?.map((feed, i) => <PostItem key={i} feed={feed as any} />)}
      </div>
    )
  } catch (error) {
    console.log(error)
    return notFound()
  }
}