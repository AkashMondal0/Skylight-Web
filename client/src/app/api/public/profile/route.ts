import db from "@/lib/db/drizzle"
import { NextRequest, NextResponse } from "next/server"
import { users } from "../../../../../db/schema"

export async function GET(request: NextRequest, response: NextResponse) {

  const data = await db.select().from(users)
  return Response.json(data)
}