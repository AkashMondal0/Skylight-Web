import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { count, eq, desc } from "drizzle-orm";
import { followers, posts, users, comments, likes } from '@/lib/db/schema';
const secret = process.env.NEXTAUTH_SECRET || "secret";
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest, response: NextResponse) {
  try {


    return NextResponse.json({
      code: 1,
      message: "post Fetched Successfully",
      status_code: 200,
      data: "Hello World"
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