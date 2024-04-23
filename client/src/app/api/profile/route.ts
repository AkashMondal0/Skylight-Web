import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import db from "../../../lib/db/drizzle"
import { users } from "../../../../db/schema"
import jwt from "jsonwebtoken"
import { getServerSession } from "next-auth/next"

export async function GET(request: NextRequest, response: NextResponse) {

  const data = await getServerSession()
  return Response.json(data)
}