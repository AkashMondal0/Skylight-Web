import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { conversations, members, messages } from "@/lib/db/schema";
import { arrayContains, desc, eq } from "drizzle-orm";
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

    // step 1
    // const data = await db.select({

    // }).from(conversations)
    //   .where(arrayContains(conversations.members, verify_id))
    //   .orderBy(desc(messages.createdAt))
    //   .leftJoin(messages, eq(members.conversationId, messages.id))
    //   .limit(12)

    // step 
    const data = await db.select({

    }).from(members)
      .where(eq(members.userId, verify_id))
      .orderBy(desc(messages.createdAt))
      .leftJoin(conversations, eq(members.conversationId, conversations.id))
      .leftJoin(messages, eq(members.conversationId, messages.id))
      .limit(12)



    return NextResponse.json({
      code: 1,
      message: "post Fetched Successfully",
      status_code: 200,
      data: data
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