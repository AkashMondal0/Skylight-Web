'use client'
import { event_name } from "@/configs/socket.event";
import { setMessage, setTyping } from "@/redux/slice/conversation";
import { Message, Typing } from "@/types";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Socket, io } from "socket.io-client";
import { toast } from 'sonner'
let loadedRef = true

interface SocketStateType {
    socket: Socket | null
}

export const SocketContext = createContext<SocketStateType>({
    socket: null
})


const Socket_Provider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const [socket, setSocket] = useState<Socket | null>(null)
    const session = useSession().data?.user


    async function SocketConnection() {
        if (loadedRef && session?.id) {
            const connection = io('http://localhost:5000/chat', {
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
                dispatch(setMessage(data))
                toast("User Disconnected")
            });
            socket?.on(event_name.conversation.seen, (data: any) => {
                
            });
            socket?.on(event_name.conversation.typing, (data: Typing) => {
                dispatch(setTyping(data))
            });
            socket?.on("test", (data: Typing) => {
                toast("From Server Test Event Message")
            });
            return () => {
                socket.off('connect')
                socket.off('disconnect')
                socket.off('test')
                socket.off(event_name.conversation.message)
                socket.off(event_name.conversation.seen)
                socket.off(event_name.conversation.typing)

            }
        }
    }, [session, socket])


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket_Provider
