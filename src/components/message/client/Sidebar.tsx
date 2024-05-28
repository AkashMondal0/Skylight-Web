"use client";
import React, { useEffect, useRef, useState } from 'react'
import { CardTitle } from '../../ui/card';
import { SquarePen } from 'lucide-react';
import { Button } from '../../ui/button';
import ConversationUserCard from '../UserCard';
import { Virtuoso } from 'react-virtuoso';
import FindUserForChat from '../modal/FindUserForChat';
import { Conversation } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setConversations } from '@/redux/slice/conversation';


export default function SidebarMessageClient({ data }: { data: Conversation[] }) {

    const dispatch = useDispatch()
    const _Conversation = useSelector((state: RootState) => state.conversation)
    const loadedRef = useRef(false)

    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(setConversations(data) as any)
            loadedRef.current = true;
        }
    }, [dispatch, data]);

    // console.log(_Conversation.list)

    return (
        <div className={`
        flex flex-col md:border-r scroll-smooth duration-300 p-1 
        hideScrollbar h-full md:max-w-[22rem] ease-in-out w-full`}>
            <Header />
            <Virtuoso
                className='h-auto w-full hideScrollbar'
                data={_Conversation.list}
                increaseViewportBy={500}
                itemContent={(i, conversation) => {
                    return <ConversationUserCard data={conversation}/>
                }} />
        </div>
    )
}

const Header = () => {
    return <div className='w-full p-4 pb-0 sticky top-0'>
        <div className="flex justify-between w-full items-center">
            <CardTitle>Sky Chat</CardTitle>
            <div>
                <FindUserForChat>
                    <Button variant={"ghost"} onClick={() => {
                    }}>
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
