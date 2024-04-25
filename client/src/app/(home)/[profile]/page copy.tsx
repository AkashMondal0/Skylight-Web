import { count, desc, eq } from "drizzle-orm"
import { followers, posts, users } from "../../../../db/schema"
import PageMD from "./components/page-md"
import PageSM from "./components/page-sm"
import { redirect } from 'next/navigation'
import db from "@/lib/db/drizzle"
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
const secret = process.env.NEXTAUTH_SECRET || "secret";


export default async function Profile({ params }: { params: { profile: string } }) {

  const cookieStore = cookies()

  const token = cookieStore.get("token-auth")

  if (!token) {
    return redirect("/auth/error")
  }

  const verify = jwt.verify(token.value, secret) as { email: string, id: string }

  if (!verify?.id) {
    return redirect("/auth/login")
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
  })
    .from(users)
    .leftJoin(posts, eq(posts.authorId, users.id))
    .where(eq(users.id, params.profile))
    .groupBy(users.id)
    .limit(1)

  if (!userProfile[0]?.id) {
    return <div>
      <h1>User not found</h1>
    </div>
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
  if (!userProfile[0].isPrivate) {
    // get post count
    const userPosts = await db.select()
      .from(posts)
      .where(eq(posts.authorId, userProfile[0].id))
      .limit(12)
      .offset(0)
      .orderBy(desc(posts.createdAt))

      const data = {
        ...userProfile[0],
        followersCount: FollowingCount[0].followingCount,
        followingCount: FollowersCount[0].followersCount,
        posts: userPosts
      }

    return (
      <div className='w-full min-h-[100dvh]'>
        <div className='mx-auto max-w-[960px]'>

          {/* md ->>> */}
          <PageMD userData={data} />

          {/* <<<- sm */}
          <PageSM userData={data} />

        </div>
      </div >
    )
  } else {
    const data = {
      ...userProfile[0],
      followersCount: FollowingCount[0].followingCount,
      followingCount: FollowersCount[0].followersCount,
      posts: []
    }
    return (
      <div className='w-full min-h-[100dvh]'>
        <div className='mx-auto max-w-[960px]'>

          {/* md ->>> */}
          <PageMD userData={data} />

          {/* <<<- sm */}
          <PageSM userData={data} />

        </div>
      </div >
    )
  }
}
