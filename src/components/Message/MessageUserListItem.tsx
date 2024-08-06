"use client"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { RootState } from "@/redux/store"
import { Conversation } from "@/types"
import { useRouter } from "next/navigation"
import { memo, useMemo } from "react"
import { useSelector } from "react-redux"
const timeFormat = (time: string | Date | undefined) => {
    if (!time) return ""
    return new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
export const MessageUserListItem = memo(function MessageUserListItem({
    data
}: {
    data: Conversation | null
}) {
    const router = useRouter()
    const Conversation = useMemo(() => {
        return data?.isGroup ? {
            ...data,
            image: data?.groupImage,
            name: data?.groupName,
        } : {
            ...data,
            image: data?.user?.profilePicture,
            name: data?.user?.username,
        }
    }, [data])

    if (!Conversation) return <></>

    return (
        <>
            <div className='flex cursor-pointer
            rounded-2xl justify-between p-3 py-2 
            transition-colors duration-300 ease-in-out
            hover:bg-accent hover:text-accent-foreground'
                onClick={() => router.push(`/message/${Conversation?.id || ""}`)}>
                <div className='flex space-x-2 items-center cursor-pointer'>
                    <SkyAvatar url={Conversation.image || "/user.jpg"} className='h-[3.3rem] w-[3.3rem] mx-auto' />
                    <div>
                        <div className='font-semibold text-base'>
                            {Conversation.name || "group name"}
                        </div>
                        <UserStatus lastText={Conversation.lastMessageContent}
                            conversationId={data?.id} />
                    </div>
                </div>
                <div className='flex items-center'>
                    {timeFormat(Conversation.updatedAt || "")}
                </div>
            </div>
        </>
    )
}, ((preProps: any, nextProps: any) => {
    return preProps.data.id === nextProps.data.id
}))

const UserStatus = ({ lastText, conversationId }: { lastText: string | any, conversationId: string | any }) => {
    const currentTyping = useSelector((Root: RootState) => Root.conversation.currentTyping)
    return (
        <div className='text-sm'>
            {currentTyping?.conversationId === conversationId && currentTyping?.typing ? "typing..." : lastText ?? "new conversation"}
        </div>
    )
}