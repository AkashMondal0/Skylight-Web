'use client'
import SkyAvatar from "@/components/sky/SkyAvatar"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { memo } from "react"

export const StoryItem = memo(function Story({
    story
}: {
    story: {
        url: string
        label: string
    }
}) {
    // console.info('%c<StoryItem/>', 'color: yellow; font-weight: bold;');

    return <div className="w-16 h-16">
        <SkyAvatar url={story.url} className={'rounded-full object-cover h-16 w-16 border-fuchsia-500 border-[3px] p-[2px]'} />
        <p className="text-xs font-normal text-center w-16 truncate">{story.label}</p>
    </div>
})

export const UploadYourStory = memo(function YourStory({ className }: { className?: string }) {
    const session = useSession().data?.user
   
   return <div>
        <div className="flex items-end ">
            <div className={cn(`w-16 h-16 rounded-full cursor-pointer overflow-hidden`, className)}>
                <SkyAvatar url={session?.image} className={cn('rounded-full object-cover w-full h-full')} />
            </div>
            <div className="w-0 relative right-5">
                <Plus className='w-5 h-5 border-[0.5px] border-white text-white bg-[#478fee] rounded-full' />
            </div>
        </div>
        <p className="text-xs font-normal text-center">Your Story</p>
    </div>
}, (() => true))