import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { users } from "../../../../db/schema";

export async function GET() {
    const data = await db.select().from(users);
    // const data = await db.insert(users).values({
    //     name: "Olivia Mondal",
    //     email: "olivia@gmail.com",
    //     password: "123456",
    // }).returning();

    return NextResponse.json(data);
}