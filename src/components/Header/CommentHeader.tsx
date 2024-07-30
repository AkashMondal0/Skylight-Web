import { memo } from "react"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { Post } from "@/types"

export const CommentHeader = memo(function CommentHeader({ data }: { data: Post }) {

    return (<div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
        <div className='flex space-x-2 items-center cursor-pointer'
        // onClick={() => onNavigate(`/${post.user.username}`)}
        >
            <SkyAvatar url={data.user.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]' />
            <div>
                <div className='font-semibold text-base'>{data.user.username}</div>
                <div className='text-sm'>Los Angeles, California</div>
            </div>
        </div>
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
            </svg>
        </div>
    </div>)
}, ((pre: any, next: any) => {
    return pre.data.user.id === next.data.user.id
}))