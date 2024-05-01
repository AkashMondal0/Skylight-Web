import { NextRequest } from "next/server"
import db from "@/lib/db/drizzle"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { redirect } from 'next/navigation';
import { and, eq } from "drizzle-orm";
import { likes } from "../../../../../../../db/schema";

export async function POST(request: NextRequest) {
    try {
        // const token = request.cookies.get("token-auth")

        // if (!token) {
        //     return redirect("/auth/error")
        // }

        // const verify = jwt.verify(token.value, secret) as { email: string, id: string }

        // if (!verify?.id) {
        //     return Response.json({
        //         code: 0,
        //         message: "Invalid token",
        //         status_code: 404,
        //         data: {}
        //     }, { status: 404 })
        // }

        const {
            postId,
            authorId
        } = await request.json()

        if (!postId || !authorId) {
            return Response.json({
                code: 0,
                message: "Invalid request",
                status_code: 400,
                data: {}
            }, { status: 400 })
        }

        const checkAlreadyLiked = await db.select({
            id: likes.id
        }).from(likes).where(and(
            eq(likes.authorId, authorId),
            eq(likes.postId, postId)
        )).limit(1)

        if (checkAlreadyLiked[0]) {
            return Response.json({
                code: 0,
                message: "This post is already liked by you",
                status_code: 400,
                data: {}
            }, { status: 400 })
        }

        await db.insert(likes).values({
            authorId: authorId,
            postId: postId
        })

        return Response.json({
            code: 1,
            message: "Like created successfully",
            status_code: 200,
            data: {}
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