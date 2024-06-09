import db from "@/lib/db/drizzle"
import {
  conversations,
  messages
} from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { eq, sql } from "drizzle-orm";
import redis from "@/lib/db/redis";

export async function POST(request: NextRequest, response: NextResponse) {
  try {

    const token = request.headers.get("authorization") || request.cookies.get("token-auth")?.value
    if (!token) {
      return Response.json({
        code: 0,
        message: "Token not found",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    let verify_id = jwt.verify(token, secret) as { email: string, id: string } as any

    verify_id = verify_id.id // logged user id

    if (!verify_id) {
      console.log("Invalid token")
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }
    // profile verification

    const {
      authorId,
      members,
      content,
      conversationId,
      isGroup
    } = await request.json() as {
      authorId: string,
      members: string[],
      content: string,
      conversationId: string
      isGroup: boolean
    }

    const data = await db.insert(messages).values({
      content,
      authorId,
      conversationId,
    }).returning()

    await db.update(conversations)
      .set({ lastMessageContent: content })
      .where(eq(conversations.id, conversationId))

    if (isGroup) {
      return NextResponse.json({
        code: 1,
        message: "Create Successfully",
        status_code: 200,
        data: data[0]
      }, { status: 200 })
    }

    try {
      const receiverId = await redis.hget(`session:${members[0]}`, "socketId")

      if (receiverId) {
        redis.publish("message", JSON.stringify({ ...data[0], receiverId }));
      }
    } catch (error) {
    }
    /// send notification to all members

    return NextResponse.json({
      code: 1,
      message: "Create Successfully",
      status_code: 200,
      data: data[0]
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