import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db/drizzle"
import { comments, posts, users } from '@/lib/db/schema';

export async function GET(request: NextRequest, { params }: { params: { profile: string } }) {
    try {
        const postId = "0ca43881-b278-4bca-a37c-95ed3310932d"
        const skip = request.nextUrl.searchParams.get("skip")
        const size = request.nextUrl.searchParams.get("size")
        const PostsData = await db.select({
            id:comments.id,
            content:comments.comment,
            createdAt:comments.createdAt,
            updatedAt:comments.updatedAt,
            author:{
                id:users.id,
                name:users.username,
                email:users.email,
                profilePicture:users.profilePicture,
            },

        })
            .from(comments)
            .leftJoin(users, eq(comments.authorId, users.id))
            .where(eq(comments.postId, postId))
            .limit(Number(size))
            .offset(Number(skip))
        return Response.json({
            code: 1,
            message: "User Post Fetch Successfully",
            status_code: 200,
            data: PostsData
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            code: 0,
            message: "Internal server error",
            status_code: 500,
            data: {}
        }, { status: 500 })
    }
}