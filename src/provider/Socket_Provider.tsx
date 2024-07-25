'use client'
import { setMessage } from "@/redux/slice/conversation";
import { Conversation, Message } from "@/types";
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
            socket?.on('incoming-message-server', (data: Message) => {
                dispatch(setMessage(data))
            });

            socket?.on('incoming-user-keyboard-pressing-server', (data: any) => {
                toast("User Disconnected")
            });

            socket?.on('incoming-message-seen-server', (data: any) => {
                toast("User Disconnected")
            });

            socket?.on('incoming-notification-server', (data: any) => {
                toast("User Disconnected")
            });

            socket?.on('incoming-conversation-server', (data: Conversation) => {
                toast("User Disconnected")
            });
            
            return () => {
                socket?.off('connect')
                socket.off('disconnect')
                socket?.off('incoming-message')
                socket.off('incoming-user-keyboard-pressing')
                socket?.off('incoming-message-seen')
                socket?.off('incoming-notification')
                socket?.off('incoming-conversation')
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
