import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { conversations, messages, users } from "@/lib/db/schema";
import { arrayContains, desc, eq, exists, max, sql, inArray } from "drizzle-orm";
export async function GET(request: NextRequest, response: NextResponse) {
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

    verify_id = "1a15377d-bee0-4f75-9cd1-5875df2b0ca4" || verify_id.id // logged user id

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

    // find all conversations and last messages
    const data = await db.select({
      id: conversations.id,
      authorId: conversations.authorId,
      members: sql`(array_remove(${conversations.members}, ${verify_id}))`,
      isGroup: conversations.isGroup,
      groupDescription: conversations.groupDescription,
      groupImage: conversations.groupImage,
      groupName: conversations.groupName,
    })
      .from(conversations)
      .where(arrayContains(conversations.members, [verify_id]))
      .orderBy(desc(messages.updatedAt))
      .limit(10)

    if (data.length <= 0) {
      return NextResponse.json({
        code: 1,
        message: "Fetched Successfully No Item",
        status_code: 200,
        data: []
      }, { status: 200 })
    }

    const findUserData = async (id: string[]) => {
      return await db.select({
        id: users.id,
        email: users.email,
        username: users.username,
        profilePicture: users.profilePicture,
      })
        .from(users)
        .where(inArray(users.id, id))
    }

    const finalData = await Promise.all(
      data.map(async (item) => {
        // console.log(item.members)
        return {
          ...item,
          membersWithData: await findUserData(item.members as string[]),
        }
      })
    )

    return NextResponse.json({
      code: 1,
      message: "Fetched Successfully",
      status_code: 200,
      data: finalData
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