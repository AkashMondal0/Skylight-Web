"use client";
import React from 'react'
import { CardTitle } from '../ui/card';
import { SquarePen } from 'lucide-react';
import { Button } from '../ui/button';
import ChatUserCard from './UserCard';


export default function SidebarMessage() {

    return (
        <div className={`md:border-r 
        scroll-smooth hideScrollbar h-[100dvh] 
        md:w-96 ease-in-out w-full md:max-w-[22rem] duration-300 px-4`}>
            <div className='w-full my-4'>
                <div className="flex justify-between w-full items-center">
                    <CardTitle>Sky Chat</CardTitle>
                    <div>
                        <Button variant={"ghost"} onClick={() => {
                        }}>
                            <SquarePen className='w-6 h-6 cursor-pointer' />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between py-3 w-full">
                    <div className='font-semibold'>Message</div>
                    <div className='text-gray-500 text-sm'>Requests</div>
                </div>
            </div>
            <div className='space-y-4 mt-2'>
                {Array.from({ length: 10 }).map((_, i) => <ChatUserCard user={null} key={i} />)}
            </div>
        </div>
    )
}

