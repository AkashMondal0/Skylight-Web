import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers';

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    cookies().delete("token-auth")
    return NextResponse.json({
      code: 1,
      message: "Logout successfully",
      status_code: 200,
      data: {}
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