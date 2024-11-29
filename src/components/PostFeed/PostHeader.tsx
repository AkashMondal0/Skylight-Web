import React from 'react'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { Post } from '@/types'
import { timeAgoFormat } from '@/lib/timeFormat'
import { EllipsisHorizontal } from '../sky/icons'
import PostOptionsDialog from '../Dialog/Post.Options.Dialog'

const PostHeader = ({
    post,
    onNavigate
}: {
    post: Post,
    onNavigate: (path: string) => void,
}) => {
    return (
        <div className='flex justify-between px-2'>
            <div className='flex space-x-2 items-center cursor-pointer' onClick={() => onNavigate(`/${post.user.username}`)}>
                <SkyAvatar url={post.user.profilePicture} className='h-12 w-12 mx-auto flex-none' />
                <div className='shrink flex flex-col'>
                    <div className='flex gap-1 flex-none'>
                        <p className='font-semibold text-base max-w-52 text-ellipsis truncate'>
                            {post.user.username + " • "}</p>
                        <p className='font-light text-base '>{timeAgoFormat(post.createdAt)}</p>
                    </div>
                    <div className='text-sm shrink text-ellipsis truncate max-w-72'>Los Angeles, California</div>
                </div>
            </div>
            <PostOptionsDialog data={post}>
                <div className='flex items-center cursor-pointer'>
                    {EllipsisHorizontal()}
                </div>
            </PostOptionsDialog>
        </div>
    )
}

export default PostHeader