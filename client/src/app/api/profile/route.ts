import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, response: NextResponse) {
    console.log(request.cookies.get("next-auth.session-token"))
    const res = await axios.get("http://localhost:4000/profile/users")
    const data = await res.data

    return Response.json({ data })
}