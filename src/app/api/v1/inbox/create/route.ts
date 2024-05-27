import db from "@/lib/db/drizzle"
import {
  conversations
} from "@/lib/db/schema"

import { NextRequest, NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { and, arrayContains, eq } from "drizzle-orm";

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
      isGroup,
      groupDescription = "Group",
      groupName = "Group",
      groupImage = "/user.jpg"
    } = await request.json() as { authorId: string, members: string[], isGroup: boolean, groupDescription: string, groupName: string, groupImage: string }

    if (!authorId ?? !members ?? !isGroup) {
      console.log(authorId, members, isGroup)
      return NextResponse.json({
        code: 0,
        message: "Invalid request body",
        status_code: 400,
        data: {}
      }, { status: 400 })
    }

    if (isGroup && members.length >= 2) {
      const data = await db.insert(conversations).values({
        authorId,
        members,
        isGroup,
      }).returning()

      return NextResponse.json({
        code: 1,
        message: "Create group Successfully",
        status_code: 200,
        data: data[0]
      }, { status: 200 })
    }

    if (members.length !== 2) {
      return NextResponse.json({
        code: 0,
        message: "Invalid members create dm with only 2 members",
        status_code: 400,
        data: {}
      }, { status: 400 })
    }

    const findConversationData = await db.select({
      id: conversations.id,
    })
      .from(conversations)
      .where(
        and(
          arrayContains(conversations.members, members),
          eq(conversations.isGroup, false)
        )
      )
      .limit(1)

    if (findConversationData.length > 0) {
      return NextResponse.json({
        code: 0,
        message: "Conversation already exist",
        status_code: 400,
        data: {}
      }, { status: 400 })
    }

    const data = await db.insert(conversations).values({
      authorId,
      members,
      isGroup,
    }).returning()

    return NextResponse.json({
      code: 1,
      message: "Create dm Successfully",
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