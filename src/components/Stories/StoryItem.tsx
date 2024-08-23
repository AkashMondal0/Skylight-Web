'use client'
import SkyAvatar from "@/components/sky/SkyAvatar"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { memo } from "react"

export const StoryItem = memo(function Story({ story, className }: { story: { url: string, label: string }, className?: string }) {
    // console.info('%c<StoryItem/>', 'color: yellow; font-weight: bold;');

    return <div className="flex justify-center flex-col px-2">
        <div className="flex items-end flex-none w-auto h-auto mx-auto">
            <div className={cn(`w-16 h-16 rounded-full cursor-pointer overflow-hidden`, className)}>
                <SkyAvatar url={story?.url} className={cn('rounded-full object-cover w-full h-full')} />
            </div>
        </div>
        <div className="shrink">
            <p className="text-xs font-normal text-center text-ellipsis truncate">{story.label}</p>
        </div>
    </div>
})

export const UploadYourStory = memo(function YourStory({ className }: { className?: string }) {
    const session = useSession().data?.user

    return <div>
        <div className="flex items-end">
            <SkyAvatar url={session?.image} className={cn(`w-16 h-16 rounded-full aspect-square`, className)} />
            <div className="w-0 relative right-5">
                <Plus className='w-5 h-5 border-[0.5px] border-white text-white bg-[#478fee] rounded-full' />
            </div>
        </div>
        <p className="text-xs font-normal text-center">Your Story</p>
    </div>
}, (() => true))