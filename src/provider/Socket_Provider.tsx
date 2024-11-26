/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { configs } from "@/configs";
import { event_name } from "@/configs/socket.event";
import { getSessionApi } from "@/redux-stores/slice/account/api.service";
import { setMessage, setMessageSeen, setTyping } from "@/redux-stores/slice/conversation";
import { conversationSeenAllMessage, fetchConversationsApi } from "@/redux-stores/slice/conversation/api.service";
import { setNotification } from "@/redux-stores/slice/notification";
import { fetchUnreadMessageNotificationCountApi, fetchUnreadNotificationCountApi } from "@/redux-stores/slice/notification/api.service";
import { RootState } from "@/redux-stores/store";
import { Message, Notification, Typing } from "@/types";
import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { createContext, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { toast } from 'sonner'
// let loadedRef = false

interface SocketStateType {
    socket: Socket | null
    sendDataToServer: (eventName: string, data: unknown) => void
}

export const SocketContext = createContext<SocketStateType>({
    socket: null,
    sendDataToServer: () => { }
})


const Socket_Provider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const session = useSelector((Root: RootState) => Root.AccountState.session)
    const list = useSelector((state: RootState) => state.ConversationState.conversationList)
    const conversation = useSelector((state: RootState) => state.ConversationState.conversation)
    const socketRef = useRef<Socket | null>(null)
    const params = useParams()

    const SocketConnection = useCallback(async () => {
        if (session) {
            if (socketRef.current) return
            // fetchAllNotification 
            dispatch(fetchUnreadNotificationCountApi() as any)
            socketRef.current = io(`${configs.serverApi?.baseUrl?.replace("/v1", "")}/chat`, {
                transports: ['websocket'],
                withCredentials: true,
                query: {
                    userId: session.id,
                    username: session.username
                }
            })
        } else {
            dispatch(getSessionApi() as any)
        }
    }, [session?.id, socketRef.current])

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
            socketRef.current?.on('connect', () => {
                toast("User Connected", { position: "top-center" })
            });
            socketRef.current?.on('disconnect', () => {
                toast("User Disconnected", { position: "top-center" })
            });
            // incoming events
            socketRef.current?.on(event_name.conversation.message, (data: Message) => {
                if (data.authorId !== session?.id) {
                    if (list.find(conversation => conversation.id === data.conversationId)) {
                        dispatch(setMessage(data))
                    } else {
                        dispatch(fetchConversationsApi({
                            limit: 16,
                            offset: 0,
                            id: data.conversationId
                        }) as any)
                    }
                    dispatch(fetchUnreadMessageNotificationCountApi() as any)
                    seenAllMessage(data.conversationId)
                }
            });
            socketRef.current?.on(event_name.conversation.seen, (data: { conversationId: string, authorId: string }) => {
                if (data.authorId !== session?.id) {
                    dispatch(setMessageSeen(data))
                }
            });
            socketRef.current?.on(event_name.conversation.typing, (data: Typing) => {
                if (data.authorId !== session?.id) {
                    dispatch(setTyping(data))
                }
            });
            socketRef.current?.on(event_name.notification.post, (data: Notification) => {
                if (data.authorId !== session?.id) {
                    dispatch(setNotification(data))
                }
            });
            socketRef.current?.on("test", (data: Typing) => {
                toast("From Server Test Event Message", { position: "top-center" })
            });
            return () => {
                socketRef.current?.off('connect')
                socketRef.current?.off('disconnect')
                socketRef.current?.off('test')
                socketRef.current?.off(event_name.conversation.message)
                socketRef.current?.off(event_name.conversation.seen)
                socketRef.current?.off(event_name.conversation.typing)
                socketRef.current?.off(event_name.notification.post)
            }
        }
    }, [session?.id, list, socketRef.current, conversation])


    const sendDataToServer = useCallback((eventName: string, data: unknown) => {
        if (socketRef.current) {
            socketRef.current.emit(eventName, data)
        }
    }, [])


    return (
        <SocketContext.Provider value={{
            socket: socketRef.current,
            sendDataToServer
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket_Provider