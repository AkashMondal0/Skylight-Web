"use client"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { Conversation } from "@/types"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
const timeFormat = (time: string | Date | undefined) => {
    if (!time) return ""
    return new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
const ConversationUserCard = ({
    data
}: {
    data: Conversation | null
}) => {

    const router = useRouter()
    const Conversation = useMemo(() => {
        return data?.isGroup ? {
            image: data?.groupImage,
            name: data?.groupName,
            message: data?.lastMessageContent,
            time: data?.updatedAt,
            id: data?.id
        } : {
            image: data?.user?.profilePicture,
            name: data?.user?.username,
            message: data?.lastMessageContent,
            time: data?.updatedAt,
            id: data?.user?.id
        }
    }, [data])

    if (!Conversation) return <></>
    return (
        <>
            <div className='flex cursor-pointer
            rounded-2xl justify-between p-3 
            transition-colors duration-300 ease-in-out
            hover:bg-accent hover:text-accent-foreground'
                onClick={() => router.push(`/message/${Conversation?.id || ""}`)}>
                <div className='flex space-x-2 items-center cursor-pointer'>
                    <SkyAvatar url={Conversation.image || "/user.jpg"} className='h-[3.3rem] w-[3.3rem] mx-auto' />
                    <div>
                        <div className='font-semibold text-base'>
                            {Conversation.name || "group name"}
                        </div>
                        <div className='text-sm'>
                            {Conversation?.message || "new conversation"}
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    {timeFormat(Conversation.time || "")}
                </div>
            </div>
        </>
    )
}

export default ConversationUserCard