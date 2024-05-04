import { redirect, notFound } from "next/navigation"
import jwt from "jsonwebtoken"
import db from "@/lib/db/drizzle";
import { count, eq, desc, exists, and } from "drizzle-orm";
import { cookies } from "next/headers";
import { followers, posts, users } from "@/lib/db/schema";
const secret = process.env.NEXTAUTH_SECRET || "secret";
import dynamic from "next/dynamic";
import SkeletonProfile from "@/components/profile/loading/skeleton";

const Lg_Device = dynamic(() => import('@/components/profile/Lg_Device'),{
    loading: () => <SkeletonProfile />
})
const Sm_Device = dynamic(() => import('@/components/profile/Sm_Device'),{
    loading: () => <SkeletonProfile />
})



export default async function Page({ params }: { params: { profile: string } }) {

    try {
        const token = cookies().get("token-auth")

        if (!token) {
            return redirect("/auth/login")
        }

        const verify = jwt.verify(token.value, secret) as { email: string, id: string }

        if (!verify?.id) {
            return redirect("/auth/login")
        }

        const profileId = verify.id
        const userProfileId = params.profile.replace(/%40/g, "@")

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
                    eq(followers.followerUserId, profileId),
                    eq(followers.followingUserId, users.id)
                )
            )))
        })
            .from(users)
            .leftJoin(posts, eq(posts.authorId, users.id))
            .where(eq(users.email, userProfileId)) // <-------------
            .groupBy(users.id)
            .limit(1)

        if (!userProfile[0].id) {
            return notFound()
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

        if (!FollowingCount[0] && !FollowersCount[0] && !userProfile[0]) {
            return notFound()
        }
        // check if user is private
        const userPosts = await db.select()
            .from(posts)
            .where(eq(posts.authorId, userProfile[0].id))
            .limit(12)
            .offset(0)
            .orderBy(desc(posts.createdAt))
            // console.log(userPosts)
        return <>
            <div className='w-full min-h-[100dvh]'>
                <div className='mx-auto max-w-[960px] overflow-x-hidden'>
                    {/* md ->>> */}
                    <Lg_Device
                        isProfile={profileId === userProfile[0].id}
                        user={{
                            ...userProfile[0],
                            followersCount: FollowersCount[0].followersCount,
                            followingCount: FollowingCount[0].followingCount,
                            posts: userPosts
                        } as any} />
                    {/* <<<- sm */}
                    <Sm_Device isProfile={profileId === userProfile[0].id}
                        user={{
                            ...userProfile[0],
                            followersCount: FollowersCount[0].followersCount,
                            followingCount: FollowingCount[0].followingCount,
                            posts: userPosts
                        } as any} />
                </div>
            </div >
        </>
    } catch (error) {
        return notFound()
    }
}


