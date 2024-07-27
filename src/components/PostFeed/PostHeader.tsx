import React from 'react'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { Post } from '@/types'

const PostHeader = ({
    post,
    onNavigate
}: {
    post: Post,
    onNavigate: (path: string) => void,
}) => {
    return (
        <div className='flex justify-between px-2'>
            <div className='flex space-x-2 items-center cursor-pointer'
                onClick={() => onNavigate(`/${post.user.username}`)}>
                <SkyAvatar url={post.user.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]' />
                <div>
                    <div className='font-semibold text-base'>{post.user.username} .
                        <span className='font-light text-base'>1d</span>
                    </div>
                    <div className='text-sm'>Los Angeles, California</div>
                </div>
            </div>
            <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                    strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                    <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
                </svg>
            </div>
        </div>
    )
}

export default PostHeader