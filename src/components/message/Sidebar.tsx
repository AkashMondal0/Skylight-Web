"use client";
import React, { memo, useEffect } from 'react'
import { CardTitle } from '../ui/card';
import { SquarePen } from 'lucide-react';
import { Button } from '../ui/button';
import FindUserForChat from './modal/FindUserForChat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoadingMessageSidebar } from './loading';
import Sm_Navigation from '../home/navigation/sm-navigation';
import { fetchConversationsApi } from '@/redux/services/conversation';
import VirtualizeConversationList from './VirtualizeList';
import CList from "../../../clist.json"
const MemoizedSm_Navigation = memo(Sm_Navigation)
let pageLoaded = false

export default function SidebarMessageClient() {
    const rootConversation = useSelector((Root: RootState) => Root.conversation)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!pageLoaded) {
            dispatch(fetchConversationsApi() as any)
            pageLoaded = true
        }
    }, [])


    if (rootConversation.listLoading || !pageLoaded) {
        return <LoadingMessageSidebar />
    }

    if (rootConversation.listError && pageLoaded) {
        return <>Not Found</>
    }

    return (
        <div className={`flex flex-col md:border-r scroll-smooth 
            duration-300 bg-background text-foreground 
            h-full md:max-w-[22rem] ease-in-out w-full`}>
            <VirtualizeConversationList
                conversation={rootConversation.conversationList}
                Header={<Header />}/>
            <MemoizedSm_Navigation />
        </div>
    )
}

const Header = () => {
    return <div className='w-full p-4 pb-0 sticky top-0 bg-background z-50'>
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