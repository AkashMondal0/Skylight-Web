// try {
//     await db.insert(comments).values({
//         authorId: req.body.authorId,
//         postId: req.body.postId,
//         comment: req.body.comment
//     });
//     return res.status(200).json({
//         code: 1,
//         message: "Comment Created Successfully",
//         status_code: 200,
//         data: {}
//     })
// } catch (error: any) {
//     console.log(error)
//     return res.status(500).json({
//         code: 0,
//         message: "Server Error Please Try Again (Post Route - /post/create/comment)",
//         status_code: 200,
//         data: {}
//     })
// }
import { and, eq } from 'drizzle-orm';
import { NextRequest } from "next/server"
import db from "@/lib/db/drizzle"
import { likes } from '@/lib/db/schema';
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

        // const {
        //     postId,
        //     authorId
        // } = await request.json()

        if (!params.id || !verify.id) {
            return Response.json({
                code: 0,
                message: "Invalid request",
                status_code: 400,
                data: {}
            }, { status: 400 })
        }

        await db.delete(likes).where(and(
            eq(likes.authorId, verify.id),
            eq(likes.postId, params.id)
        ))

        return Response.json({
            code: 1,
            message: "This post is disliked by you successfully",
            status_code: 200,
            data: {}
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