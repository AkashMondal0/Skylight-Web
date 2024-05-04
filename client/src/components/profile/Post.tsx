// "use client"
import { FeedPost } from '@/redux/slice/post-feed'
import React from 'react'

const PostComponent = async ({
    posts
}: {
    posts: FeedPost[]
}) => {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return (
        <div className="grid grid-cols-3 gap-2 sm:gap-1 sm:w-full">
            {posts.map((post, index) => (
                <img key={index} src={post.fileUrl[0]} className='aspect-square w-full h-full object-cover cursor-default' />
            ))}
        </div>
    )
}
export default PostComponent
