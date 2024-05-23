import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { count, eq, desc } from "drizzle-orm";
import { posts, users, comments, likes } from '@/lib/db/schema';
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const token = request.headers.get("authorization")

        if (!token) {
            return Response.json({
                code: 0,
                message: "Token not found",
                status_code: 404,
                data: {}
            }, { status: 404 })
        }

        let verify_id = jwt.verify(token, secret) as { email: string, id: string } as any

        const authorId = verify_id.id

        if (!verify_id) {
            //   console.log("Invalid token")
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
            likeCount: count(eq(likes.postId, posts.id)),
            createdAt: posts.createdAt,
            alreadyLiked: eq(likes.authorId, authorId),
            authorData: {
                id: users.id,
                username: users.username,
                email: users.email,
                name: users.name,
                profilePicture: users.profilePicture,
            },
        })
            .from(posts)
            .where(eq(posts.id, params.id))
            .limit(1)
            .leftJoin(comments, eq(posts.id, comments.postId))
            .leftJoin(likes, eq(posts.id, likes.postId))
            .innerJoin(users, eq(posts.authorId, users.id))
            .groupBy(
                posts.id,
                users.id,
                posts.createdAt,
                comments.postId,
                likes.postId,
                likes.authorId,
            )
        const post_comments = await db.select({
            id: comments.id,
            comment: comments.comment,
            createdAt: comments.createdAt,
            authorData: {
                id: users.id,
                username: users.username,
                email: users.email,
                name: users.name,
                profilePicture: users.profilePicture,
            }
        }).from(comments)
            .where(eq(comments.postId, params.id))
            .leftJoin(users, eq(comments.authorId, users.id))
            .orderBy(desc(comments.createdAt))
            .limit(12)
            .groupBy(
                comments.id,
                users.id,
                comments.createdAt
            )

        return NextResponse.json({
            code: 1,
            message: "post Fetched Successfully",
            status_code: 200,
            data: { ...data[0], comments: post_comments }
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