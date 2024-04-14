/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import db from "../../db-connections/postgresql"
import { comments, likes, posts, users } from "../../schema"
import { asc, desc, eq, sql } from "drizzle-orm"
const PostRouter = express.Router()

PostRouter.post("/create", async (req, res) => {
    try {
        await db.insert(posts).values({
            caption: req.body.caption,
            fileUrl: req.body.fileUrl,
            authorId: req.body.authorId
        });
        return res.status(200).json({
            code: 1,
            message: "Success",
            error_code: 200,
            data: {}
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})

PostRouter.patch("/update", async (req, res) => {
    try {
        const data = await db.update(posts).set({
            caption: req.body.caption,
            fileUrl: req.body.fileUrl,
            updatedAt: sql`NOW()`
        }).where(eq(posts.id, "9d5e606e-e875-44ea-b98e-329a313b6905")).returning()

        return res.status(200).json({
            code: 1,
            message: "Success",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})

PostRouter.post("/comment/create", async (req, res) => {
    try {
        await db.insert(comments).values({
            authorId: req.body.authorId,
            postId: req.body.postId,
            comment: req.body.comment
        });
        return res.status(200).json({
            code: 1,
            message: "Success",
            error_code: 200,
            data: {}
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})



PostRouter.get("/get/posts", async (req, res) => {
    try {
        const authorId = req.headers["author_id"] as string

        const data = await db.select({
            id: posts.id,
            caption: posts.caption,
            fileUrl: posts.fileUrl,
            commentCount: sql`COUNT(${comments.id})`,
            likeCount: sql`COUNT(${likes.id})`,
            authorData: users,
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
            message: "Success",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})

PostRouter.get("/get/comments", async (req, res) => {
    try {
        const postId = "9d5e606e-e875-44ea-b98e-329a313b6905" as string

        const data = await db.select({
            id: comments.id,
            comment: comments.comment,
            createdAt: comments.createdAt,
            // authorData: users,
            // postData: posts,
        })
            .from(comments)
            .leftJoin(users, eq(comments.authorId, users.id))
            .leftJoin(posts, eq(comments.postId, posts.id))
            .where(eq(comments.postId, postId))
            .limit(5)
            .offset(15)
            .orderBy(asc(comments.createdAt), desc(comments.updatedAt))


        return res.status(200).json({
            code: 1,
            message: "Success",
            error_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})



export default PostRouter