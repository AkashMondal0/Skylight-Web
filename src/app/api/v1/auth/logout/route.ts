import { cookies } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'
export async function DELETE(request: NextRequest, response: NextResponse) {
    const cookieStore = cookies();

    // Get all cookies
    const allCookies = cookieStore.getAll();

    // Delete each cookie individually
    for (const cookie of allCookies) {
        cookieStore.delete(cookie.name);
    }

    return new Response("", { status: 200, statusText: "OK" })
}