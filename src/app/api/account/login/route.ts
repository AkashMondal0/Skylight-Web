import { eq } from 'drizzle-orm';
import db from "@/lib/db/drizzle";
import { NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/db/schema";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
const secret = process.env.NEXTAUTH_SECRET || "secret";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const email = request.headers.get("email");
    const password = request.headers.get("password");

    if (!email && !password) {
      return NextResponse.json({
        code: 0,
        message: "Email and password is required",
        status_code: 400,
        data: {}
      }, { status: 400 })
    }

    const db_user = await db.select().from(users).where(eq(users.email, email as string));
    if (!db_user[0]) {
      return NextResponse.json({
        code: 0,
        message: "Email not found",
        status_code: 401,
        data: {}
      }, { status: 401 })
    }
    // const checkPassword = await bcrypt.compare(password as string, db_user[0].password)

    if (false) {
      return NextResponse.json({
        code: 0,
        message: "Invalid credential",
        status_code: 400,
        data: {}
      }, { status: 401 })
    }

    const token = jwt.sign({
      email: db_user[0].email,
      id: db_user[0].id,
      name: db_user[0].name,
      username: db_user[0].username,
      image: db_user[0].profilePicture
    }, secret as string, { expiresIn: '720h' })
    
    cookies().set({
      name: 'token-auth',
      value: token,
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "lax"
    })
    return NextResponse.json({
      code: 1,
      message: "Login successfully",
      status_code: 200,
      data: {
        ...db_user[0],
        token,
      }
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