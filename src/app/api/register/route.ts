import { configs } from '@/configs';
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const cookieStore = cookies();
        const res = await fetch(`${configs.serverApi.baseUrl}/auth/register`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            redirect: "follow",
            body: JSON.stringify({
                email: body.email,
                password: body.password,
                name: body.name,
                username: body.username
            }),
            credentials: "include",
            cache: "no-cache"
        })
        const _data = await res.json()

        if (!res.ok) {
            return NextResponse.json({
                error: _data,
                message: _data.message,
                code: 0
            }, { status: 400 });
        }

        cookieStore.set(configs.cookieName, _data.accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/',
        })

        return NextResponse.json({
            data: _data,
            message: "Success",
            code: 1
        }, { status: 200 });

    } catch (e: any) {
        console.error(e)
        return NextResponse.json({
            error: e,
            message: "An error occurred",
            code: 0
        }, { status: 500 });
    }
}