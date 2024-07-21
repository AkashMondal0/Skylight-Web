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
        <div className={cn("w-full h-[4.5rem] px-4 border-b")}>
            <div className="flex justify-between items-center h-full w-full">
                {/* logo */}
                <div className='flex items-center gap-2'>
                    <div className='md:hidden cursor-pointer'>
                        {/* <SheetSide trigger={<Menu size={30} className='cursor-pointer'/>}>
                                <Sidebar />
                            </SheetSide> */}
                        <ChevronLeft
                            size={30} onClick={() => router.back()} />
                    </div>
                    <>
                        <div className="flex items-center gap-2">
                            <SkyAvatar className='h-12 w-12' url={Conversation.image || '/user.jpg'} />
                            <div className='w-40'>
                                <div className="text-xl font-bold 
                                    text-gray-900 dark:text-gray-100 truncate">
                                    {Conversation?.name || "group name"}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                    {/* {data?.typing ? "typing..." : userData?.status ? "online" : "offline"} */}

                                </div>
                            </div>
                        </div>
                    </>
                </div>
                {/* navigation */}
                <div className="items-center gap-3 flex">
                    {/*  */}
                    {/* mode toggle */}
                    <div className='md:hidden flex gap-2'>
                        <Button variant="outline" size="icon" className='rounded-full'>
                            <Info size={30} />
                        </Button>
                    </div>
                </div>
                {/*  */}
                <div className='hidden md:flex gap-2'>

                    <Button variant="outline" size="icon" className='rounded-full'>
                        <Info size={30} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InBoxHeader;