// "use client"
import { FeedPost } from '@/redux/slice/post-feed'
import React from 'react'
import Image from 'next/image'

const PostComponent = ({
    posts
}: {
    posts: FeedPost[]
}) => {
    // await new Promise((resolve) => setTimeout(resolve, 100))
    return (
        <div className="grid grid-cols-3 gap-1 w-full">
            {posts.map((post, index) => (
                <div key={index}>
                    <Image
                        loading='lazy'
                        src={post.fileUrl[0]}
                        width={300}
                        height={300}
                        alt="Picture of the author"
                        sizes="100vw"
                        className='aspect-square w-full h-full object-cover cursor-default rounded-xl userNotSelectImg'
                    />
                </div>
            ))}
        </div>
    )
}
export default PostComponent
