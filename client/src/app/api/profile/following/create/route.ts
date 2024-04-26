import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import db from "@/lib/db/drizzle";
import { and, eq, like, or } from "drizzle-orm";
import { followers } from "../../../../../../db/schema";
const secret = process.env.NEXTAUTH_SECRET || "secret";


export async function POST(request: NextRequest, response: NextResponse) {

  try {
    const token = request.cookies.get("token-auth")
    const { followerUserId, followingUserId } = await request.json()

    if (!token) {
      return Response.json({
        code: 0,
        message: "login required",
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

    const check = await db.query.followers.findFirst({
      where(fields) {
        return and(
          eq(fields.followerUserId, followerUserId),
          eq(fields.followingUserId, followingUserId)
        )
      }
    })

    if (check) {
      return Response.json({
        code: 0,
        message: "Already Followed",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    await db.insert(followers).values({
      followerUserId: followerUserId,
      followingUserId: followingUserId,
    })


    return Response.json({
      code: 1,
      message: "Followed Successfully",
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
