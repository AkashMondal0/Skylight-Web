import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
const secret = process.env.NEXTAUTH_SECRET || "secret";


export async function GET(request: NextRequest, response: NextResponse) {
  try {

    const token = request.cookies.get("token-auth")

    if (!token) {
      return redirect("/auth/error")
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

    const data = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        profilePicture: users.profilePicture,
        bio: users.bio,
        createdAt: users.createdAt,
        isVerified: users.isVerified,
        isPrivate: users.isPrivate,
        accessToken: users.accessToken,
        refreshToken: users.refreshToken,
        loggedDevice: users.loggedDevice,
      })
      .from(users)
      .where(eq(users.id, verify.id))

    if (!data[0]) {
      return Response.json({
        code: 0,
        message: "User not found",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    return Response.json(data[0])

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