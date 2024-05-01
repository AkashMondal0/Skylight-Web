import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db/drizzle"
import { likes, posts, users } from '../../../../../../../db/schema';

export async function GET(request: NextRequest, { params }: { params: { profile: string } }) {
    try {
        const postId = "c73a1e14-0647-4b6c-b196-b38c535c5d8c"
        const skip = request.nextUrl.searchParams.get("skip")
        const size = request.nextUrl.searchParams.get("size")
        const PostsData = await db.select({
            id: users.id,
            name: users.username,
            email: users.email,
            profile: users.profilePicture,
        })
            .from(likes)
            .leftJoin(users, eq(likes.authorId, users.id))
            .where(eq(likes.postId, postId))
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