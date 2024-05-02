import { redirect } from "next/navigation"
import Profile from "./components/Profile"
import jwt from "jsonwebtoken"
import db from "@/lib/db/drizzle";
import { count, eq, like, or, desc, not, is, sql, exists, and } from "drizzle-orm";
import { cookies } from "next/headers";
import { User } from "@/types";
import { followers, posts, users } from "@/lib/db/schema";
const secret = process.env.NEXTAUTH_SECRET || "secret";


export default async function Page({ params }: { params: { profile: string } }) {

    try {
        const token = cookies().get("token-auth")

        if (!token) {
            return redirect("/auth/error")
        }

        const verify = jwt.verify(token.value, secret) as { email: string, id: string }

        if (!verify?.id) {
            return redirect("/auth/error")
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
            return redirect("/auth/error")
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
            return redirect("/auth/error")
        }

        // check if user is private
        // if (!userProfile[0].isPrivate && userProfile[0].isFollowing || userProfile[0].id === verify.id) {
        // get post count
        const userPosts = await db.select()
            .from(posts)
            .where(eq(posts.authorId, userProfile[0].id))
            .limit(12)
            .offset(0)
            .orderBy(desc(posts.createdAt))
            // document.title = `${userProfile[0].username} (@${userProfile[0].username}) | Instagram`
        return <Profile
            isProfile={userProfile[0].id === verify.id}
            UserProfile={{
                ...userProfile[0],
                followersCount: FollowingCount[0].followingCount,
                followingCount: FollowersCount[0].followersCount,
                posts: userPosts || [],
            } as User} />
        // } else {
        //     return <Profile UserProfile={{
        //         ...userProfile[0],
        //         followersCount: FollowingCount[0].followingCount,
        //         followingCount: FollowersCount[0].followersCount,
        //         posts: [],
        //     } as unknown as User} />
        // }
    } catch (error) {
        return redirect("/auth/error")
    }
}


