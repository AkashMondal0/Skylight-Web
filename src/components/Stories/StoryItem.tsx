'use client'
import SkyAvatar from "@/components/sky/SkyAvatar"
import { cn } from "@/lib/utils"
import { RootState } from "@/redux-stores/store"
import { AuthorData, Highlight } from "@/types"
import { Plus } from "lucide-react"
import { memo } from "react"
import { useSelector } from "react-redux"
import { OptimizedImage } from "../sky"

export const StoryItem = memo(function Story({ data, className }: { data: Highlight, className?: string }) {
    // console.info('%c<StoryItem/>', 'color: yellow; font-weight: bold;');

    if (!data.stories) return null

    return <div className="flex justify-center flex-col px-2">
        <div className="flex items-end flex-none w-auto h-auto mx-auto">
            <div className={cn(`w-16 h-16 rounded-full cursor-pointer overflow-hidden`, className)}>
                <SkyAvatar
                    url={data?.stories[0].fileUrl ? data?.stories[0].fileUrl[0].urls?.high : null}
                    className={cn('rounded-full object-cover w-full h-full aspect-square')} />
            </div>
        </div>
        <div className="shrink">
            <p className="text-xs font-normal text-center text-ellipsis truncate">{data.content}</p>
        </div>
    </div>
})

export const AvatarItem = memo(function Story({ data, className }: { data: AuthorData, className?: string }) {
    // console.info('%c<StoryItem/>', 'color: yellow; font-weight: bold;');

    if (!data) return null

    return <div className="flex justify-center flex-col px-2">
        <div className="flex items-end flex-none w-auto h-auto mx-auto">
            <div className={cn(`w-16 h-16 rounded-full cursor-pointer overflow-hidden`, className)}>
                <SkyAvatar
                    url={data.profilePicture}
                    className={cn('rounded-full object-cover w-full h-full aspect-square')} />
            </div>
        </div>
        <div className="shrink">
            <p className="text-xs font-normal text-center text-ellipsis truncate">{data.username}</p>
        </div>
    </div>
})

export const UploadYourStory = memo(function YourStory({ className }: { className?: string }) {
    const session = useSelector((state: RootState) => state.AccountState.session)

    return <div>
        <div className={cn(`flex items-end`)}>
            <OptimizedImage
                width={100}
                height={100}
                src={session?.profilePicture}
                alt="Picture of the author"
                sizes={"(min-width: 808px) 20vw, 30vw"}
                fetchPriority="high"
                className={cn(`w-16 h-16 cursor-pointer rounded-full userNotSelectImg bg-muted object-cover p-0 aspect-square`)} />
            <div className="w-0 relative right-5">
                <Plus className='w-5 h-5 border-[1px] border-white text-white bg-[#478fee] rounded-full' />
            </div>
        </div>
        <p className="text-xs font-normal text-center">Your Story</p>
    </div>
}, (() => true))