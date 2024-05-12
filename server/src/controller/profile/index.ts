import {
    count,
    desc,
    eq,
    exists,
    and,
} from "drizzle-orm";
import db from "../../db-connections/postgresql";
import { followers, posts, users } from "../../schema";
import { FeedPost, User } from "../../types";


const getProfile = async (username: string, profileId: string): Promise<{
    code: number
    message: string
    status_code: number
    data: User | null
}> => {
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
        .where(eq(users.username, username)) // <-------------
        .groupBy(users.id)
        .limit(1) as User[]

    if (!userProfile[0].id) {
        return {
            code: 0,
            message: "User not found",
            status_code: 404,
            data: null
        }
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
    const userPosts = await db.select()
        .from(posts)
        .where(eq(posts.authorId, userProfile[0].id))
        .limit(12)
        .offset(0)
        .orderBy(desc(posts.createdAt)) as FeedPost[] | []

    return {
        code: 1,
        message: "User found",
        status_code: 200,
        data: {
            ...userProfile[0],
            followersCount: FollowingCount[0].followingCount,
            followingCount: FollowersCount[0].followersCount,
            posts: userPosts,
        }
    };
};


export {
    getProfile
}