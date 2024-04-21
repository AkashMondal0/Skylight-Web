import { eq } from 'drizzle-orm';
import db from "@/lib/db/drizzle";
import { NextRequest, NextResponse } from "next/server"
import { users } from "../../../../../db/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = process.env.NEXTAUTH_SECRET || "secret";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const email = request.headers.get("email");
    const password = request.headers.get("password");

    if (!email && !password) {
      return NextResponse.json({
        code: 0,
        message: "Email and password is required",
        error_code: 400,
        data: {}
      }, { status: 400 })
    }

    const db_user = await db.select().from(users).where(eq(users.email, email as string));
    if (!db_user[0]) {
      return NextResponse.json({
        code: 0,
        message: "Email not found",
        error_code: 401,
        data: {}
      }, { status: 401 })
    }
    const checkPassword = await bcrypt.compare(password as string, db_user[0].password)

    if (!checkPassword) {
      return NextResponse.json({
        code: 0,
        message: "Invalid credential",
        error_code: 400,
        data: {}
      }, { status: 401 })
    }

    const token = jwt.sign({ email: db_user[0].email, id: db_user[0].id }, secret as string, { expiresIn: '1h' })

    return NextResponse.json({
      code: 1,
      message: "Login successfully",
      error_code: 200,
      data: {
        ...db_user[0],
        token,
      }
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      code: 0,
      message: "Internal server error",
      error_code: 500,
      data: {}
    }, { status: 500 })
  }
}