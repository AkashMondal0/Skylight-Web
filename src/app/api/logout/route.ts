import { configs } from '@/configs';
import { cookies } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'
export async function DELETE(request: NextRequest, response: NextResponse) {
    const cookieStore = cookies();
    cookieStore.delete(configs.cookieName);
    return new Response("", { status: 200, statusText: "OK" })
}