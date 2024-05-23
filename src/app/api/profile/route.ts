import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
const secret = process.env.NEXTAUTH_SECRET || "secret";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  try {
    const token = request.cookies.get("token-auth")

    if (!token) {
      console.log("token not found")
      return Response.json({
        code: 0,
        message: "token not found",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    const verify = jwt.verify(token.value, secret) as { email: string, id: string }

    if (!verify?.id) {
      console.log("Invalid token")
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    // profile verification
    return Response.json({
      code: 1,
      message: "Success",
      status_code: 200,
      data: verify
    }, { status: 200 })

  } catch (error) {
    console.log(error)
    return Response.json({
      code: 0,
      message: "Internal server error",
      status_code: 500,
      data: {}
    }, { status: 500 })
  }
}

