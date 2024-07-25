'use client'
import { useSession } from "next-auth/react";
import { createContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from 'sonner'

interface SocketStateType {
    socket: Socket | null
}

export const SocketContext = createContext<SocketStateType>({
    socket: null
})


const Socket_Provider = ({ children }: { children: React.ReactNode }) => {
    const loadedRef = useRef(true)
    // const [socketId, setSocketId] = useState<Socket['id'] | null>(null)
    const [socket, setSocket] = useState<Socket | null>(null)
    const session = useSession().data?.user

    async function SocketConnection() {
        if (loadedRef.current && session?.id) {
            const connection = io('http://localhost:5000/chat', {
                transports: ['websocket'],
                withCredentials: true,
                query: {
                    userId: session.id,
                    username: session.username
                }
            })
            setSocket(connection)
            loadedRef.current = false
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
            socket?.on('incoming-message', (data: any) => {
                toast("User Connected")
            });

            socket?.on('incoming-user-keyboard-pressing', (data: any) => {
                toast("User Disconnected")
            });

            socket?.on('incoming-message-seen', (data: any) => {
                toast("User Disconnected")
            });

            socket?.on('incoming-notification', (data: any) => {
                toast("User Disconnected")
            });

            return () => {
                socket?.off('connect')
                socket.off('disconnect')
                socket?.off('incoming-message')
                socket.off('incoming-user-keyboard-pressing')
                socket?.off('incoming-message-seen')
                socket?.off('incoming-notification')
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
