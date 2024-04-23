import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

export async function GET(request: NextRequest, response: NextResponse) {

  const data = await getServerSession()
  return Response.json(data)
}