"use client"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { conversationSeenAllMessage } from "@/redux/services/conversation"
import { RootState } from "@/redux/store"
import { Conversation } from "@/types"
import { useRouter } from "next/navigation"
import { memo, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
const timeFormat = (time: string | Date | undefined) => {
    if (!time) return ""
    return new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
export const MessageUserListItem = memo(function MessageUserListItem({
    data,
}: {
    data: Conversation
}) {
    const router = useRouter()
    const dispatch = useDispatch()
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

    const seenAllMessage = async () => {
        if (!data?.id) return toast.error("Something went wrong")
        dispatch(conversationSeenAllMessage(data.id) as any)
        router.push(`/message/${data?.id || ""}`)
    }

    if (!Conversation) return <></>

    return (
        <>
            <div className='flex cursor-pointer
            rounded-2xl justify-between p-3 py-2 
            transition-colors duration-300 ease-in-out
            hover:bg-accent hover:text-accent-foreground'
                onClick={seenAllMessage}>
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
                <div className='flex items-center flex-col'>
                    {timeFormat(Conversation.lastMessageCreatedAt || "")}
                    <TotalUnreadMessagesCount count={Conversation.totalUnreadMessagesCount} />
                </div>
            </div>
        </>
    )
}, ((preProps, nextProps) => {
    return preProps.data.id === nextProps.data.id 
    && preProps.data?.messages?.length === nextProps.data?.messages?.length
    && preProps.data?.lastMessageContent === nextProps.data?.lastMessageContent
}))

const UserStatus = ({ lastText, conversationId }: { lastText: string | any, conversationId: string | any }) => {
    const currentTyping = useSelector((Root: RootState) => Root.conversation.currentTyping)
    return (
        <div className='text-sm'>
            {currentTyping?.conversationId === conversationId && currentTyping?.typing ? "typing..." : lastText ?? "new conversation"}
        </div>
    )
}

const TotalUnreadMessagesCount = ({ count }: { count: number | any }) => {
    if (!count || count <= 0) return <></>
    return (
        <p className="bg-primary text-primary-foreground flex justify-center items-center hover:bg-primary/90 w-6 h-6 rounded-full">
            {count}
        </p>
    )
}