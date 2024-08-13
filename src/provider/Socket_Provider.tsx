'use client'
import { configs } from "@/configs";
import { event_name } from "@/configs/socket.event";
import { conversationSeenAllMessage, fetchConversationsApi } from "@/redux/services/conversation";
import { setMessage, setMessageSeen, setTyping } from "@/redux/slice/conversation";
import { setPostNotification } from "@/redux/slice/notification";
import { RootState } from "@/redux/store";
import { Message, Notification, PostActionsProps, Typing } from "@/types";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { toast } from 'sonner'
let loadedRef = true

interface SocketStateType {
    socket: Socket | null
}

export const SocketContext = createContext<SocketStateType>({
    socket: null,
})


const Socket_Provider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const [socket, setSocket] = useState<Socket | null>(null)
    const session = useSession().data?.user
    const list = useSelector((state: RootState) => state.conversation.conversationList)
    const conversation = useSelector((state: RootState) => state.conversation.conversation)
    const params = useParams()

    async function SocketConnection() {
        if (loadedRef && session?.id) {
            const connection = io(`${configs.serverApi.baseUrl}/chat`, {
                transports: ['websocket'],
                withCredentials: true,
                query: {
                    userId: session.id,
                    username: session.username
                }
            })
            setSocket(connection)
            loadedRef = false
        }
    }
    const seenAllMessage = debounce(async (conversationId: string) => {
        if (!conversationId || !session?.id) return
        if (params?.id === conversationId && conversation) {
            // toast("New Message")
            dispatch(conversationSeenAllMessage({
                conversationId: conversation.id,
                authorId: session?.id,
            }) as any)
            socket?.emit(event_name.conversation.seen, {
                conversationId: conversation.id,
                authorId: session?.id,
                members: conversation.members?.filter((member) => member !== session?.id),
            })
        }
    }, 1500)

    useEffect(() => {
        SocketConnection()
        if (socket) {
            // connection
            socket?.on('connect', () => {
                // toast("User Connected",{position:"top-center"})
            });
            socket?.on('disconnect', () => {
                // toast("User Disconnected",{position:"top-center"})
            });
            // incoming events
            socket?.on(event_name.conversation.message, (data: Message) => {
                if (list.find(conversation => conversation.id === data.conversationId)) {
                    dispatch(setMessage(data))
                } else {
                    // toast("New Message",{position:"top-center"})
                    dispatch(fetchConversationsApi() as any)
                }
                seenAllMessage(data.conversationId)
            });
            socket?.on(event_name.conversation.seen, (data: { conversationId: string, authorId: string }) => {
                dispatch(setMessageSeen(data))
            });
            socket?.on(event_name.conversation.typing, (data: Typing) => {
                dispatch(setTyping(data))
            });
            socket?.on(event_name.notification.post.like, (data: Notification) => {
                dispatch(setPostNotification(data))
            });
            socket?.on("test", (data: Typing) => {
                toast("From Server Test Event Message",{position:"top-center"})
            });
            return () => {
                socket?.off('connect')
                socket?.off('disconnect')
                socket?.off('test')
                socket?.off(event_name.conversation.message)
                socket?.off(event_name.conversation.seen)
                socket?.off(event_name.conversation.typing)
                socket?.off(event_name.notification.post.like)
            }
        }
    }, [session, list, socket,conversation])


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket_Provider