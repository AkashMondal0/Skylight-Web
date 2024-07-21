"use client";
import React, { memo, useEffect, useRef } from 'react'
import { CardTitle } from '../ui/card';
import { SquarePen } from 'lucide-react';
import { Button } from '../ui/button';
import ConversationUserCard from './UserCard';
import { Virtuoso } from 'react-virtuoso';
import FindUserForChat from './modal/FindUserForChat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoadingMessageSidebar } from './loading';
const MemorizeConversationUserCard = memo(ConversationUserCard)

export default function SidebarMessageClient() {
    const dispatch = useDispatch()
    const rootConversation = useSelector((Root: RootState) => Root.conversation)
    const loadedRef = useRef(false)

    useEffect(() => {
        if (!loadedRef.current) {
            loadedRef.current = true;
        }
    }, [])


    if (rootConversation.listLoading || !loadedRef.current) return <LoadingMessageSidebar />

    return (
        <div className={`
        flex flex-col md:border-r scroll-smooth duration-300 p-1 
        hideScrollbar h-full md:max-w-[22rem] ease-in-out w-full`}>
            <Header />
            <Virtuoso
                className='h-auto w-full hideScrollbar'
                data={rootConversation.conversationList}
                increaseViewportBy={500}
                itemContent={(i, conversation) => {
                    return <MemorizeConversationUserCard data={conversation}
                        key={conversation.id} />
                }} />
        </div>
    )
}

const Header = () => {
    return <div className='w-full p-4 pb-0 sticky top-0'>
        <div className="flex justify-between w-full items-center">
            <CardTitle>SkyLight</CardTitle>
            <div>
                <FindUserForChat>
                    <Button variant={"ghost"} className='rounded-2xl'>
                        <SquarePen className='w-6 h-6 cursor-pointer' />
                    </Button>
                </FindUserForChat>

            </div>
        </div>
        <div className="flex items-center justify-between py-3 w-full">
            <div className='font-semibold'>Message</div>
            <div className='text-gray-500 text-sm'>Requests</div>
        </div>
    </div>
}
