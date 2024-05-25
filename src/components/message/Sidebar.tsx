"use client";
import React from 'react'
import { CardTitle } from '../ui/card';
import { SquarePen } from 'lucide-react';
import { Button } from '../ui/button';
import ChatUserCard from './UserCard';
import Link from 'next/link';
import { Virtuoso } from 'react-virtuoso';


export default function SidebarMessage() {

    return (
        <Link href={"/message/1233"} className={`md:border-r scroll-smooth duration-300 px-4
        hideScrollbar h-dvh md:max-w-[22rem] ease-in-out w-full`}>
            <Virtuoso
                className='h-auto w-full hideScrollbar'
                data={Array.from({ length: 30 })}
                increaseViewportBy={1000}
                itemContent={(index, post) => {
                    return <ChatUserCard user={null} />
                }}
                components={{
                    Header: () => <div className='w-full my-4'>
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
                    </div>,
                }} />
        </Link>
    )
}

