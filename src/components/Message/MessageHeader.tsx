import { cn } from '@/lib/utils';
import { ChevronLeft, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SkyAvatar from '@/components/sky/SkyAvatar';
import { Conversation } from '@/types';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const MessageHeader = memo(function MessageHeader({ data }: { data: Conversation }) {
    const router = useRouter()

    const Conversation = useMemo(() => {
        return data?.isGroup ? {
            image: data?.groupImage,
            name: data?.groupName,
            id: data?.id
        } : {
            image: data?.user?.profilePicture,
            name: data?.user?.username,
            id: data?.id
        }
    }, [data])


    if (!Conversation) return null


    return (
        <div className={cn("w-full h-14 md:h-[4rem] px-2 border-b sticky top-0 z-50 bg-background")}>
            <div className="flex justify-between items-center h-full w-full">
                {/* logo */}
                <div className='flex items-center'>
                    <div className='md:hidden cursor-pointer'>
                        <ChevronLeft size={30} onClick={() => router.back()} />
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <SkyAvatar className='md:h-12 md:w-12 w-10 h-10' url={Conversation.image || '/user.jpg'} />
                        </div>
                        <div className='w-40'>
                            <div className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                                {Conversation?.name || "...."}
                            </div>
                            <UserStatus conversationId={data.id} />
                        </div>
                    </div>
                </div>
                {/* navigation */}
            </div>
        </div>
    );
}, ((preProps: any, nestProps: any) => {
    return preProps.id === nestProps.id
}))

const UserStatus = ({ conversationId }: any) => {
    const currentTyping = useSelector((Root: RootState) => Root.conversation.currentTyping)
    return (
        <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentTyping?.conversationId === conversationId && currentTyping?.typing ? "typing..." : "status"}
        </div>
    )
}