/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import db from "../../db-connections/postgresql"
import { comments, followers, likes, posts, users } from "../../schema"
import { asc, desc, eq, sql } from "drizzle-orm"
const PostRouter = express.Router()

// feed post route
PostRouter.post("/create", async (req, res) => {
    try {
        await db.insert(posts).values({
            caption: req.body.caption,
            fileUrl: req.body.fileUrl,
            authorId: req.body.authorId
        });
        return res.status(200).json({
            code: 1,
            message: "Post Created Successfully",
            error_code: 200,
            data: {}
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/create)",
            error_code: 200,
            data: {}
        })
    }
})

PostRouter.patch("/update", async (req, res) => {
    try {
        const postId = req.headers["post_id"] as string
        const data = await db.update(posts).set({
            caption: req.body.caption,
            fileUrl: req.body.fileUrl,
            updatedAt: sql`NOW()`
        }).where(eq(posts.id, postId)).returning()

        return res.status(200).json({
            code: 1,
            message: "Post Updated Successfully",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/update)",
            error_code: 200,
            data: {}
        })
    }
})

PostRouter.get("/get", async (req, res) => {
    try {
        const authorId = req.headers["author_id"] as string

        const data = await db.select({
            id: posts.id,
            caption: posts.caption,
            fileUrl: posts.fileUrl,
            commentCount: sql`COUNT(${comments.id})`,
            likeCount: sql`COUNT(${likes.id})`,
            authorData: users,
            // comments: sql`ARRAY_AGG(${comments.comment})`,
        })
            .from(posts)
            .leftJoin(comments, eq(posts.id, comments.postId))
            .leftJoin(likes, eq(posts.id, likes.postId))
            .leftJoin(users, eq(posts.authorId, users.id))
            .groupBy(posts.id, users.id)
            .where(eq(posts.authorId, authorId))
            .limit(12)
            .orderBy(asc(posts.createdAt), desc(posts.updatedAt))


        return res.status(200).json({
            code: 1,
            message: "post Fetched Successfully",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/get)",
            error_code: 200,
            data: {}
        })
    }
})

PostRouter.get("/get/daily-feed", async (req, res) => {
    try {
        const authorId = req.headers["author_id"] as string

        const data = await db.select({
            id: followers.followingUserId,
            post: {
                id: posts.id,
                caption: posts.caption,
                fileUrl: posts.fileUrl,
                commentCount: sql`COUNT(${comments.id})`,
                likeCount: sql`COUNT(${likes.id})`,
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
                followers.id
            )

        return res.status(200).json({
            code: 1,
            message: "post Fetched Successfully",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/get)",
            error_code: 200,
            data: {}
        })
    }
})

PostRouter.delete("/delete", async (req, res) => {
    try {
        const postId = req.headers["post_id"] as string

        await db.delete(posts).where(eq(posts.id, postId))

        return res.status(200).json({
            code: 1,
            message: "Post Deleted Successfully",
            error_code: 200,
            data: {}
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/delete)",
            error_code: 200,
            data: {}
        })
    }
})

// feed post comment route
PostRouter.post("/create/comment", async (req, res) => {
    try {
        await db.insert(comments).values({
            authorId: req.body.authorId,
            postId: req.body.postId,
            comment: req.body.comment
        });
        return res.status(200).json({
            code: 1,
            message: "Comment Created Successfully",
            error_code: 200,
            data: {}
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/create/comment)",
            error_code: 200,
            data: {}
        })
    }
})

PostRouter.get("/get/comments", async (req, res) => {
    try {
        const postId = req.headers["post_id"] as string

        const data = await db.select({
            id: comments.id,
            comment: comments.comment,
            createdAt: comments.createdAt,
            authorData: users,
        })
            .from(comments)
            .where(eq(comments.postId, postId))
            .leftJoin(users, eq(comments.authorId, users.id))
            // .leftJoin(posts, eq(comments.postId, posts.id))
            .limit(5)
            .offset(0)
            .orderBy(asc(comments.createdAt), desc(comments.updatedAt))


        return res.status(200).json({
            code: 1,
            message: "comment Fetched Successfully",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/get/comments)",
            error_code: 200,
            data: {}
        })
    }
})

// feed post like route
PostRouter.post("/create/like", async (req, res) => {
    try {
        const data = await db.insert(likes).values({
            authorId: req.body.authorId,
            postId: req.body.postId
        })

        return res.status(200).json({
            code: 1,
            message: "Like Created Successfully",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again (Post Route - /post/create/like)",
            error_code: 200,
            data: {}
        })
    }
})


export default PostRouter