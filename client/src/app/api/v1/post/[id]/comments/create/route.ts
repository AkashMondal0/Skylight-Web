import { NextRequest } from "next/server"
import db from "@/lib/db/drizzle"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { comments } from "@/lib/db/schema";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = request.cookies.get("token-auth")

        if (!token) {
            return Response.json({
                code: 0,
                message: "not found token",
                status_code: 404,
                data: {}
            }, { status: 404 })
        }

        const verify = jwt.verify(token.value, secret) as { email: string, id: string }

        if (!verify?.id) {
            return Response.json({
                code: 0,
                message: "Invalid token",
                status_code: 404,
                data: {}
            }, { status: 404 })
        }

        const {
            postId,
            authorId,
            comment
        } = await request.json()

        if (!postId || !authorId || !comment) {
            return Response.json({
                code: 0,
                message: "Invalid request",
                status_code: 400,
                data: {}
            }, { status: 400 })
        }

        const data = await db.insert(comments).values({
            authorId: authorId,
            postId: postId,
            comment: comment
        }).returning()

        return Response.json({
            code: 1,
            message: "comment created successfully",
            status_code: 200,
            data: data
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