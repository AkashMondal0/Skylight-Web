import { Post } from '@/types'
import React from 'react'
// import LikeViewModal from '../dialog/LikeViewModal';

export const PostComments = ({
    post,
    onNavigate
}: {
    post: Post,
    onNavigate: (path: string) => void,
}) => {

    return (

        <div className='mx-3 space-y-2'>
            {/* close friend comments */}
            <div className='flex space-x-2'>
                <p>
                    <span
                        className='font-semibold cursor-pointer mr-2'
                        onClick={() => { onNavigate(`/${post.user.username}`) }}>
                        {post.user.username}
                    </span>
                    {post.content}
                </p>
            </div>
            {/* load more */}
            {/* lg*/}
            <div className='text-sm cursor-pointer hidden sm:block'
                onClick={() => {
                    onNavigate(`/post/${post.id}`)
                }}>View all {post.commentCount} comments</div>
            {/* sm */}
            <div className='text-sm cursor-pointer sm:hidden block'
                onClick={() => {
                    onNavigate(`/post/${post.id}/comments`)
                }}>View all {post.commentCount} comments</div>
        </div>
    )
}
