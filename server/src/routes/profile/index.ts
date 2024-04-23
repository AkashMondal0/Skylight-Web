/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import db from "../../db-connections/postgresql"
import { followers, posts, users } from "../../schema"
import { and, count, eq, or, sql } from "drizzle-orm"
const ProfileRouter = express.Router()
// profile route
// ProfileRouter.delete("/delete", async (req, res) => { })
ProfileRouter.patch("/details/edit", async (req, res) => {
    try {
        const postId = req.headers["post_id"] as string
        const data = await db.update(users).set({
            updatedAt: sql`NOW()`,
            username: req.body.username,
            email: req.body.email,
            bio: req.body.bio,
            profilePicture: req.body.profilePicture,
        })
            .where(eq(users.id, postId))
            .returning()

        return res.status(200).json({
            code: 1,
            message: "User Updated Successfully",
            status_code: 200,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/update)",
            status_code: 500,
            data: {}
        })
    }
})

// // profile settings route
// ProfileRouter.patch("/settings/edit", async (req, res) => { })

// show public profile with out login - view profile route
ProfileRouter.get("/public/:userId", async (req, res) => {
    try {
        const user = await db.query.users.findFirst({
            where(fields) {
                return eq(fields.id, req.params.userId)
            },
            columns: {
                id: true,
                username: true,
                email: true,
                bio: true,
                profilePicture: true,
                createdAt: true,
            },
            with: {
                posts: {
                    limit: 9,
                    with: {
                        comments: {
                            limit: 3,
                            orderBy: (comments, { desc }) => [desc(comments.createdAt)],
                        }
                    }
                }
            }
        })
        if (!user) {
            return res.status(404).json({
                code: 0,
                message: "User not found",
                status_code: 404,
                data: {}
            })
        }

        // get followers count
        const FollowersCount = await db.select({
            followersCount: count(eq(followers.followerUserId, user.id)),
        })
            .from(followers)
            .where(eq(followers.followerUserId, user.id))

        // get following count
        const FollowingCount = await db.select({
            followingCount: count(eq(followers.followingUserId, user.id)),
        })
            .from(followers)
            .where(eq(followers.followingUserId, user.id))

        // get post count
        const PostCount = await db.select({
            postCount: count(eq(posts.authorId, user.id)),
        })
            .from(posts)
            .where(eq(posts.authorId, user.id))


        return res.status(200).json({
            code: 1,
            message: "Authorization successfully - user found",
            status_code: 200,
            data: {
                ...user,
                followersCount: FollowingCount[0].followingCount,
                followingCount: FollowersCount[0].followersCount,
                postCount: PostCount[0].postCount,
            }
        })
    } catch (error) {
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again - (Get Route - /profile/public/:id)",
            status_code: 500,
            data: {}
        })
    }
})

ProfileRouter.get("/public/:userId/more-posts", async (req, res) => {
    try {
        const PostsData = await db.select()
            .from(posts)
            .where(eq(posts.authorId, req.params.userId))
            .limit(Number(req.query.size))
            .offset(Number(req.query.skip))

        return res.status(200).json({
            code: 1,
            message: "User Post Fetch Successfully",
            status_code: 200,
            data: {
                postCount: PostsData,
            }
        })
    } catch (error) {
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again - (Get Route - /profile/public/:id/more-posts)",
            status_code: 500,
            data: {}
        })
    }
})

ProfileRouter.get("/public/:userId/follower", async (req, res) => {
    try {
        const Followers = await db.select({
            userData: users,
        })
            .from(followers)
            .where(eq(followers.followerUserId, req.params.userId))
            .leftJoin(users, eq(followers.followingUserId, users.id))
            .limit(Number(req.query.size))
            .offset(Number(req.query.skip))

        return res.status(200).json({
            code: 1,
            message: "User Post Fetch Successfully",
            status_code: 200,
            data: Followers
        })
    } catch (error) {
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again - (Get Route - /profile/public/:id/more-posts)",
            status_code: 500,
            data: {}
        })
    }
})

ProfileRouter.get("/public/:userId/following", async (req, res) => {
    try {
        const Followers = await db.select({
            userData: users,
        })
            .from(followers)
            .where(eq(followers.followingUserId, req.params.userId))
            .leftJoin(users, eq(followers.followerUserId, users.id))
            .limit(Number(req.query.size))
            .offset(Number(req.query.skip))

        return res.status(200).json({
            code: 1,
            message: "User Post Fetch Successfully",
            status_code: 200,
            data: Followers
        })
    } catch (error) {
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again - (Get Route - /profile/public/:id/more-posts)",
            status_code: 500,
            data: {}
        })
    }
})

ProfileRouter.post("/follow/create", async (req, res) => {
    try {

        const check = await db.query.followers.findFirst({
            where(fields) {
                return and(
                    eq(fields.followerUserId, req.body.followerUserId),
                    eq(fields.followingUserId, req.body.followingUserId)
                )
            }
        })

        if (check) {
            return res.status(404).json({
                code: 0,
                message: "Already Followed",
                status_code: 404,
                data: {}
            })
        }

        await db.insert(followers).values({
            followerUserId: req.body.followerUserId,
            followingUserId: req.body.followingUserId,
        })


        return res.status(200).json({
            code: 1,
            message: "Followed Successfully",
            status_code: 200,
            data: {}
        })
    } catch (error: any) {
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/create)",
            status_code: 500,
            data: {}
        })
    }
})

ProfileRouter.post("/follow/destroy", async (req, res) => {
    try {

        const check = await db.query.followers.findFirst({
            where(fields) {
                return and(
                    eq(fields.followerUserId, req.body.followerUserId),
                    eq(fields.followingUserId, req.body.followingUserId)
                )
            }
        })

        if (!check) {
            return res.status(404).json({
                code: 0,
                message: "Not Followed",
                status_code: 404,
                data: {}
            })
        }

        await db.delete(followers)
            .where(eq(followers.id, check?.id))

        return res.status(200).json({
            code: 1,
            message: "Unfollowed Successfully",
            status_code: 200,
            data: {}
        })
    } catch (error: any) {
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/create)",
            status_code: 500,
            data: {}
        })
    }
})


export default ProfileRouter