import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"
import { conversations, messages, users } from "@/lib/db/schema";
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

    const data = await db.query.conversations.findMany({
      where: arrayContains(conversations.members, ["1a15377d-bee0-4f75-9cd1-5875df2b0ca4"]),
      orderBy: (conversations, { desc }) => desc(messages.createdAt),
      limit: 10,
      with: {
        messages: {
          limit: 1,
          columns: {
            content: true,
            createdAt: true
          },
          orderBy: (messages, { desc }) => desc(messages.createdAt),
        },
      },
    });

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