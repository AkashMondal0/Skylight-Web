import { cn } from '@/lib/utils';
import { ChevronLeft, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SkyAvatar from '@/components/sky/SkyAvatar';
import { Conversation } from '@/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const MessageHeader = ({ data }: { data: Conversation }) => {
    const router = useRouter()
    const currentTyping = useSelector((Root: RootState) => Root.conversation.currentTyping)

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
        <div className={cn("w-full h-14 md:h-[4rem] px-2 border-b sticky top-0 z-50 bg-background")}>
            <div className="flex justify-between items-center h-full w-full">
                {/* logo */}
                <div className='flex items-center'>
                    <div className='md:hidden cursor-pointer'>
                        {/* <SheetSide trigger={<Menu size={30} className='cursor-pointer'/>}>
                                <Sidebar />
                            </SheetSide> */}
                        <ChevronLeft size={30} onClick={() => router.back()} />
                    </div>
                    <div className="flex items-center gap-2">
                        <SkyAvatar className='md:h-12 md:w-12 w-10 h-10 my-2' url={Conversation.image || '/user.jpg'} />
                        <div className='w-40'>
                            <div className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                                {Conversation?.name || "...."}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {!currentTyping
                                    ? "status" :
                                    currentTyping?.conversationId === data.id
                                        ? currentTyping.typing ? "typing..." : "status" : "status"}
                            </div>
                        </div>
                    </div>
                </div>
                {/* navigation */}
            </div>
        </div>
    );
};