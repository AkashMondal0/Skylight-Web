/* eslint-disable @next/next/no-img-element */
'use client'
import { cn } from '@/lib/utils';
import { ChevronLeft, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import SkyAvatar from '@/components/sky/SkyAvatar';
import { Conversation } from '@/types';
import { useMemo } from 'react';

const InBoxHeader = ({ data }: { data: Conversation }) => {
    const router = useRouter()
    const Conversation = useMemo(() => {
        return data?.isGroup ? {
            image: data?.groupImage,
            name: data?.groupName,
            message: data?.lastMessageContent,
            time: data?.updatedAt,
            id: data?.id
        } : {
            image: data?.user?.profilePicture,
            name: data?.user?.username,
            message: data?.lastMessageContent,
            time: data?.updatedAt,
            id: data?.user?.id
        }
    }, [data])


    if (!Conversation) return null


    return (
        <div className={cn("w-full h-[4.5rem] px-2 border-b")}>
            <div className="flex justify-between items-center h-full w-full">
                {/* logo */}
                <div className='flex items-center'>
                    <div className='md:hidden cursor-pointer'>
                        {/* <SheetSide trigger={<Menu size={30} className='cursor-pointer'/>}>
                                <Sidebar />
                            </SheetSide> */}
                        <ChevronLeft size={30} onClick={() => router.replace("/message")} />
                    </div>
                    <div className="flex items-center gap-2">
                        <SkyAvatar className='h-12 w-12' url={Conversation.image || '/user.jpg'} />
                        <div className='w-40'>
                            <div className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                                {Conversation?.name || "...."}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {/* {data?.typing ? "typing..." : userData?.status ? "online" : "offline"} */}
                                online
                            </div>
                        </div>
                    </div>
                </div>
                {/* navigation */}
            </div>
        </div>
    );
};

export default InBoxHeader;