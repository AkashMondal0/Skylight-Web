import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db/drizzle"
import { posts } from '../../../../../../db/schema';

export async function GET(request: NextRequest, { params }: { params: { profile: string } }) {
    try {
        const skip = request.nextUrl.searchParams.get("skip")
        const size = request.nextUrl.searchParams.get("size")
        const PostsData = await db.select()
            .from(posts)
            .where(eq(posts.authorId, params.profile))
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