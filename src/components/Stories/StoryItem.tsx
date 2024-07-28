'use client'
import SkyAvatar from "@/components/sky/SkyAvatar"
import { Plus } from "lucide-react"
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

export const YourStory = () => {
    return <div className="w-16 h-16 mr-4">
        <div className='w-16 h-16 border-[2px] rounded-full flex justify-center items-center cursor-pointer'>
            <Plus className='w-10 h-10' />
        </div>
        <p className="text-xs font-normal text-center">Your Story</p>
    </div>
}