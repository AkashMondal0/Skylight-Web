import { NextRequest } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { profile: string } }) {
    // try {
        return Response.json({
            code: 1,
            message: "User Post Fetch Successfully",
            status_code: 200,
            data: {}
        }, { status: 200 })
    // } catch (error) {
    //     return Response.json({
    //         code: 0,
    //         message: "Internal server error",
    //         status_code: 500,
    //         data: {}
    //     }, { status: 500 })
    // }
}