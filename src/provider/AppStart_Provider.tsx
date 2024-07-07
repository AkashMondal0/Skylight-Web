'use client'
import socket from '@/lib/socket-io'
import { setMessage } from '@/redux/slice/conversation'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'



const AppStart_Provider = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const session = useSession().data?.user
    const loadedRef = React.useRef(false)
    const dispatch = useDispatch()
    // const [isClient, setIsClient] = React.useState(false)

    useEffect(() => {
        if (!loadedRef.current && isConnected && session?.id) {
            socket.emit('user-connect', session?.id)
            loadedRef.current = true;
        }
        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        socket.on('messageEventHandle', (data) => {
            dispatch(setMessage(data))
        })
        socket.on('messageSeenEventHandle', () => { })
        socket.on('messageTypingEventHandle', () => { })
        socket.on('connectionEventHandle', () => { })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('messageEventHandle')
            socket.off('messageSeenEventHandle')
            socket.off('messageTypingEventHandle')
            socket.off('connectionEventHandle')
        }
    }, [session?.id])

    // useEffect(() => {
    //     setIsClient(true)
    // }, [])

    // if (!isClient) return null

    return (
        <>
            {/* <div className="flex items-center justify-center w-full h-10 bg-gray-800 text-white">
                <p>Socket Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
            </div> */}
        </>
    )
}

export default AppStart_Provider
