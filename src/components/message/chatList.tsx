import { Suspense } from "react";
import { UserCardListSkeleton } from "./loading";
import { configs } from '@/configs';
import { Conversation, RestApiPayload } from '@/types';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import SidebarMessageClient from "./client/Sidebar";

async function getProfileChatListApi() {
    try {
        const response = await fetch(`${configs.appUrl}/api/v1/inbox/getChat/`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `${cookies().get("token-auth")?.value}`
            },
            cache: "no-store"
        });
        const res = await response.json() as RestApiPayload<Conversation[]>;
        // console.log(res)
        if (res.code === 0) {
            throw new Error(res.message);
        }
        return res.data;
    } catch (error) {
        console.log(error)
        return notFound()
    }
}

const RenderSidebar = async () => {
    const data = await getProfileChatListApi()
    return <SidebarMessageClient data={data} />
}

export default function ChatListSidebar() {
    return <Suspense fallback={<UserCardListSkeleton />}>
        <RenderSidebar />
    </Suspense>
}