"use client"
import { FeedPost } from '@/redux/slice/post-feed'
import React, { useRef } from 'react'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/lib/utils'

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
                    <ImageComponent url={post.fileUrl[0]} />
                </div>
            ))}
        </div>
    )
}
export default PostComponent


const ImageComponent = ({ url }: { url: string }) => {
    const [load, setLoad] = React.useState(false)

    return <>
        <Image
            loading='lazy'
            src={url}
            width={100}
            height={100}
            alt="Picture of the author"
            sizes="20vw"
            onLoad={(e) => {
                setLoad(true)
            }}
            className={cn(`aspect-square w-full h-full object-cover cursor-default rounded-xl 
            userNotSelectImg bg-muted ${!load && "animate-pulse"}`)}
        />
    </>
}
