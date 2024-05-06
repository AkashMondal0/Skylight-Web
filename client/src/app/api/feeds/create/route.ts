import db from "@/lib/db/drizzle";
import { NextRequest, NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { posts } from '@/lib/db/schema';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const token = request.cookies.get("token-auth")

    if (!token) {
      return Response.json({
        code: 0,
        message: "Token not found",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    let verify_id = jwt.verify(token.value, secret) as { email: string, id: string } as any

    verify_id = verify_id.id

    if (!verify_id) {
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }
    const {
      caption,
      fileUrl,
      authorId
    } = await request.json()

    if (!fileUrl || !authorId) {
      return NextResponse.json({
        code: 0,
        message: "Please provide all the required fields",
        status_code: 400,
        data: {}
      }, { status: 400 })
    }

    await db.insert(posts).values({
      caption,
      fileUrl,
      authorId
    });

    return NextResponse.json({
      code: 1,
      message: "Success",
      status_code: 200,
      data: token
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