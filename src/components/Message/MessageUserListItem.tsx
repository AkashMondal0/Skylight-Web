"use client"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { event_name } from "@/configs/socket.event"
import { cn } from "@/lib/utils"
import { SocketContext } from "@/provider/Socket_Provider"
import { conversationSeenAllMessage } from "@/redux/services/conversation"
import { Conversation } from "@/types"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { memo, useContext, useMemo } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
const timeFormat = (time: string | Date | undefined) => {
    if (!time) return ""
    return new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
export const MessageUserListItem = memo(function MessageUserListItem({
    data,
    currentTyping
}: {
    data: Conversation
    currentTyping: Boolean
}) {
    const params = useParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const socketState = useContext(SocketContext)
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
        if (params.id === data.id) return
        if (!data?.id || !session?.id) return toast.error("Something went wrong")
        dispatch(conversationSeenAllMessage({
            conversationId: data.id,
            authorId: session?.id,
        }) as any)
        socketState.socket?.emit(event_name.conversation.seen, {
            conversationId: data.id,
            authorId: session?.id,
            members: data.members?.filter((member) => member !== session?.id),
        })
        router.push(`/message/${data?.id || ""}`)
    }

    if (!Conversation) return <></>

    return (
        <>
            <div className={cn(`flex cursor-pointer rounded-2xl justify-between p-1 py-2 my-1
            transition-all duration-150 delay-75 ease-in-out hover:bg-primary/10 hover:outline outline-[1px] outline-primary/50`,
                params.id === data.id ? "bg-accent text-accent-foreground" : ""
            )} onClick={seenAllMessage}>
                <div className='flex space-x-2 items-center cursor-pointer justify-between w-full'>
                    <div className="flex-none">
                        <SkyAvatar url={Conversation.image || "/user.jpg"} className='h-[3.3rem] w-[3.3rem] mx-auto' />
                    </div>
                    <div className="grow">
                        <p className='font-semibold text-base w-52 text-ellipsis truncate'>
                            {Conversation.name || "group name"}
                        </p>
                        <UserStatus
                            currentTyping={currentTyping}
                            lastText={Conversation.lastMessageContent} />
                    </div>
                    <div className='flex items-center flex-col flex-none pr-2'>
                        {timeFormat(Conversation.lastMessageCreatedAt || "")}
                        <TotalUnreadMessagesCount count={Conversation.totalUnreadMessagesCount} show={params.id !== data.id} />
                    </div>
                </div>
            </div>
        </>
    )
}, ((preProps, nextProps) => {
    return preProps.data.id === nextProps.data.id
        && preProps.data?.messages?.length === nextProps.data?.messages?.length
        && preProps.data?.lastMessageContent === nextProps.data?.lastMessageContent
        && preProps.data?.totalUnreadMessagesCount === nextProps.data?.totalUnreadMessagesCount
        && preProps.currentTyping === nextProps.currentTyping
}))

const UserStatus = ({
    lastText,
    currentTyping
}: {
    lastText: string | any,
    currentTyping: Boolean
}) => {
    return (
        <p className='text-sm w-52 text-ellipsis truncate'>
            {currentTyping ? "typing..." : lastText ?? "new conversation"}
        </p>
    )
}

const TotalUnreadMessagesCount = ({ count, show }: { count: number | any, show: boolean }) => {
    if (!show) return <p className="w-6 h-6"></p>
    if (!count || count <= 0) return <p className="w-6 h-6"></p>
    return (
        <p className="bg-primary text-primary-foreground flex justify-center items-center hover:bg-primary/90 w-6 h-6 rounded-full">
            {count}
        </p>
    )
}