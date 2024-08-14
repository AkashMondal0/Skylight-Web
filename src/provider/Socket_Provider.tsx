/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { configs } from "@/configs";
import { event_name } from "@/configs/socket.event";
import { conversationSeenAllMessage, fetchConversationsApi } from "@/redux/services/conversation";
import { fetchUnreadMessageNotificationCountApi, fetchUnreadNotificationCountApi } from "@/redux/services/notification";
import { setMessage, setMessageSeen, setTyping } from "@/redux/slice/conversation";
import { setNotification } from "@/redux/slice/notification";
import { RootState } from "@/redux/store";
import { Message, Notification, Typing } from "@/types";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { createContext, useCallback, useEffect, useRef } from "react";
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
    const session = useSession().data?.user
    const list = useSelector((state: RootState) => state.conversation.conversationList)
    const conversation = useSelector((state: RootState) => state.conversation.conversation)
    const socketRef = useRef<Socket | null>(null)
    const params = useParams()

    async function SocketConnection() {
        if (loadedRef && session?.id) {
            // fetchAllNotification 
            dispatch(fetchUnreadNotificationCountApi() as any)
            // 
            socketRef.current = io(`${configs.serverApi.baseUrl}/chat`, {
                transports: ['websocket'],
                withCredentials: true,
                query: {
                    userId: session.id,
                    username: session.username
                }
            })
            loadedRef = false
        }
    }
    const seenAllMessage = debounce(async (conversationId: string) => {
        if (!conversationId || !session?.id) return
        if (params?.id === conversationId && conversation) {
            dispatch(conversationSeenAllMessage({
                conversationId: conversation.id,
                authorId: session?.id,
            }) as any)
            socketRef.current?.emit(event_name.conversation.seen, {
                conversationId: conversation.id,
                authorId: session?.id,
                members: conversation.members?.filter((member) => member !== session?.id),
            })
        }
    }, 1500)

    useEffect(() => {
        SocketConnection()
        if (socketRef.current && session?.id) {
            // connection
            // socketRef.current?.on('connect', () => {
            //     toast("User Connected", { position: "top-center" })
            // });
            // socketRef.current?.on('disconnect', () => {
            //     toast("User Disconnected", { position: "top-center" })
            // });
            // incoming events
            socketRef.current?.on(event_name.conversation.message, (data: Message) => {
                if (list.find(conversation => conversation.id === data.conversationId)) {
                    dispatch(setMessage(data))
                } else {
                    dispatch(fetchConversationsApi() as any)
                }
                dispatch(fetchUnreadMessageNotificationCountApi() as any)
                seenAllMessage(data.conversationId)
            });
            socketRef.current?.on(event_name.conversation.seen, (data: { conversationId: string, authorId: string }) => {
                dispatch(setMessageSeen(data))
            });
            socketRef.current?.on(event_name.conversation.typing, (data: Typing) => {
                dispatch(setTyping(data))
            });
            socketRef.current?.on(event_name.notification.post, (data: Notification) => {
                dispatch(setNotification(data))
            });
            socketRef.current?.on("test", (data: Typing) => {
                toast("From Server Test Event Message", { position: "top-center" })
            });
            return () => {
                // socketRef.current?.off('connect')
                // socketRef.current?.off('disconnect')
                socketRef.current?.off('test')
                socketRef.current?.off(event_name.conversation.message)
                socketRef.current?.off(event_name.conversation.seen)
                socketRef.current?.off(event_name.conversation.typing)
                socketRef.current?.off(event_name.notification.post)
            }
        }
    }, [session, list, socketRef.current, conversation])


    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket_Provider