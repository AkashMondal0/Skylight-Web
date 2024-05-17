import { and, eq, exists } from 'drizzle-orm';
import { NextRequest } from "next/server"
import db from "@/lib/db/drizzle"
import { followers, likes, users } from '@/lib/db/schema';
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    try {
        const token = request.cookies.get("token-auth")?.value || request.headers.get("authorization")

        if (!token) {
            return Response.json({
                code: 0,
                message: "not found token",
                status_code: 404,
                data: {}
            }, { status: 404 })
        }

        const verify = jwt.verify(token, secret) as { email: string, id: string }

        if (!verify?.id) {
            return Response.json({
                code: 0,
                message: "Invalid token",
                status_code: 404,
                data: {}
            }, { status: 404 })
        }

        const skip = request.nextUrl.searchParams.get("skip")
        const size = request.nextUrl.searchParams.get("size")
        const PostsData = await db.select({
            id: users.id,
            username: users.username,
            email: users.email,
            profilePicture: users.profilePicture,
            isFollowing: exists(db.select().from(followers).where(and(
                and(
                    eq(followers.followerUserId, verify.id),
                    eq(followers.followingUserId, users.id)
                )
            )))
        })
            .from(likes)
            .leftJoin(users, eq(likes.authorId, users.id))
            .where(eq(likes.postId, params.id))
            .groupBy(users.id)
            .limit(Number(size))
            .offset(Number(skip))

        return Response.json({
            code: 1,
            message: "User Post Fetch Successfully",
            status_code: 200,
            data: PostsData
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            code: 0,
            message: "Internal server error",
            status_code: 500,
            data: {}
        }, { status: 500 })
    }
}