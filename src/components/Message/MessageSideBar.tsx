"use client";
import React, { memo, useEffect } from 'react'
import { CardTitle } from '../ui/card';
import { ServerCrash, SquarePen } from 'lucide-react';
import { Button } from '../ui/button';
import UserToMessage from '@/components/Dialog/UserToMessage.Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchConversationsApi } from '@/redux/services/conversation';
import { NavigationBottom } from '../Navigation/NavigationBottom';
import { LoadingMessageSidebar } from '../loading/Message.page';
import { VirtualUserList } from './VirtualUserList';
let pageLoaded = false

export const MessageSideBar = memo(function MessageSideBar() {
    const rootConversation = useSelector((Root: RootState) => Root.conversation)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!pageLoaded) {
            dispatch(fetchConversationsApi() as any)
            pageLoaded = true
        }
    }, [])


    if (rootConversation.listLoading && !pageLoaded || !pageLoaded) {
        return <LoadingMessageSidebar />
    }

    if (rootConversation.listError && pageLoaded) {
        return <div className='md:border-r scroll-smooth flex justify-center items-center text-center
        duration-300 bg-background text-foreground h-dvh md:max-w-80 ease-in-out w-full mx-auto'>
            <ServerCrash className='w-16 h-16' />
        </div>
    }

    return (
        <div className={`flex flex-col md:border-r scroll-smooth 
            duration-300 bg-background text-foreground 
            h-full md:max-w-80 ease-in-out w-full`}>
            <VirtualUserList
                conversation={rootConversation.conversationList}
                Header={<Header />} />
            <NavigationBottom />
        </div>
    )
}, (() => true))

const Header = memo(function Header() {

    return <div className='w-full p-4 pb-0 sticky top-0 bg-background z-50'>
        <div className="flex justify-between w-full items-center">
            <CardTitle>SkyLight</CardTitle>
            <div>
                <UserToMessage>
                    <Button variant={"ghost"} className='rounded-2xl'>
                        <SquarePen className='w-6 h-6 cursor-pointer' />
                    </Button>
                </UserToMessage>

            </div>
        </div>
        <div className="flex items-center justify-between py-3 w-full">
            <div className='font-semibold'>Message</div>
            <div className='text-gray-500 text-sm'>Requests</div>
        </div>
    </div>
}, (() => true))