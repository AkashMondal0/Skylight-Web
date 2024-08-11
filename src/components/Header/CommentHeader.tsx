import { memo } from "react"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { Post } from "@/types"
import PostOptionsDialog from "../Dialog/Post.Options.Dialog"
import { EllipsisHorizontal } from "../sky/icons"

export const CommentHeader = memo(function CommentHeader({ data }: { data: Post }) {

    return (<div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
        <div className='flex space-x-2 items-center cursor-pointer'
        // onClick={() => onNavigate(`/${post.user.username}`)}
        >
            <SkyAvatar url={data.user.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto' />
            <div>
                <div className='font-semibold text-base'>{data.user.username}</div>
                <div className='text-sm'>Los Angeles, California</div>
            </div>
        </div>
        <div className="flex items-center">
            <PostOptionsDialog data={data}>
                <div className='flex items-center cursor-pointer'>
                    {EllipsisHorizontal()}
                </div>
            </PostOptionsDialog>
        </div>
    </div>)
}, ((pre: any, next: any) => {
    return pre.data.user.id === next.data.user.id
}))