'use client'
import { configs } from "@/configs";
import { event_name } from "@/configs/socket.event";
import { fetchConversationsApi } from "@/redux/services/conversation";
import { setMessage, setMessageSeen, setTyping } from "@/redux/slice/conversation";
import { RootState } from "@/redux/store";
import { Message, Typing } from "@/types";
import { useSession } from "next-auth/react";
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

    useEffect(() => {
        SocketConnection()
        if (socket) {
            // connection
            socket?.on('connect', () => {
                toast("User Connected")
            });
            socket?.on('disconnect', () => {
                toast("User Disconnected")
            });
            // incoming events
            socket?.on(event_name.conversation.message, (data: Message) => {
                if (list.find(conversation => conversation.id === data.conversationId)) {
                    dispatch(setMessage(data))
                } else {
                    toast("New Message")
                    dispatch(fetchConversationsApi() as any)
                }
            });
            socket?.on(event_name.conversation.seen, (data: { conversationId: string, authorId: string }) => {
                dispatch(setMessageSeen(data))
            });
            socket?.on(event_name.conversation.typing, (data: Typing) => {
                dispatch(setTyping(data))
            });
            socket?.on("test", (data: Typing) => {
                toast("From Server Test Event Message")
            });
            return () => {
                socket?.off('connect')
                socket?.off('disconnect')
                socket?.off('test')
                socket?.off(event_name.conversation.message)
                socket?.off(event_name.conversation.seen)
                socket?.off(event_name.conversation.typing)
            }
        }
    }, [session, list, socket])


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket_Provider