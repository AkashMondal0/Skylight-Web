import { cookies } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest, response: NextResponse) {
    const cookieStore = cookies();
    const allCookies = cookieStore.get("skylight-token");
    return new Response(JSON.stringify(allCookies?.value), { status: 200, statusText: "OK" })
}