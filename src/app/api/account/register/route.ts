import { eq } from 'drizzle-orm';
import db from "@/lib/db/drizzle";
import { NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
const secret = process.env.NEXTAUTH_SECRET || "secret";
const saltRounds = 10

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const {
      email,
      password,
      username,
      name
    } = await request.json();
    if (!email && !password) {
      return NextResponse.json({
        code: 0,
        message: "Email and password is required",
        status_code: 400,
        data: {}
      }, { status: 400 })
    }
    const alreadyUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (alreadyUser[0] && alreadyUser[0]?.email === email) {
      return NextResponse.json({
        code: 0,
        message: "Email already exist",
        status_code: 400,
        data: {}
      }, { status: 400 })
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await db.insert(users).values({
      email: email,
      password: hash,
      username: username,
      name: name
    }).returning()
    const token = jwt.sign({
      email: newUser[0].email,
      id: newUser[0].id,
      name: newUser[0].name,
      username: newUser[0].username,
      image: newUser[0].profilePicture
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
      message: "Register successfully",
      status_code: 200,
      data: {
        ...newUser[0],
        token,
      }
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({
      code: 0,
      message: "Internal server error",
      status_code: 500,
      data: {}
    }, { status: 500 })
  }
}