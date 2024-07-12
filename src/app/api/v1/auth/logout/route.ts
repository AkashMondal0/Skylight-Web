import { cookies } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'
export async function DELETE(request: NextRequest, response: NextResponse) {
    cookies().delete('auth-session-token')
    return new Response("", { status: 200, statusText: "OK" })
}