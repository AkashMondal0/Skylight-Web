import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import db from "../../../lib/db/drizzle"
import { users } from "../../../../db/schema"

export async function GET(request: NextRequest, response: NextResponse) {
  // // const cookieStore = cookies()
  // // const theme = cookieStore.get('theme')
  // // console.log('theme', theme)
  // cookies().set({
  //     name: 'name',
  //     value: 'lee',
  //     httpOnly: true,
  //     path: '/',
  //   })
  const data = await db.select().from(users)
  return Response.json(data)
}