"use client"
import { FeedPost } from '@/redux/slice/post-feed'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Copy, Heart, MessageCircle } from 'lucide-react'

const PostComponent = ({
    posts
}: {
    posts: FeedPost[]
}) => {
    // await new Promise((resolve) => setTimeout(resolve, 100))
    const router = useRouter()
    return (
        <div className="grid grid-cols-3 gap-1 w-full p-1" >
            {posts?.map((post, index) => (
                <div key={index} onClick={() => router.push(`/post/${post.id}`)}>
                    <ImageComponent
                        totalPostsCount={post.fileUrl.length ?? 0}
                        totalLikesCount={post.likeCount}
                        totalCommentsCount={post.commentCount}
                        url={post.fileUrl[0]} />
                </div>
            ))}
        </div>
    )
}
export default PostComponent


const ImageComponent = ({
    url,
    totalLikesCount,
    totalCommentsCount,
    totalPostsCount
}: {
    url: string,
    totalLikesCount: number | string,
    totalCommentsCount: number | string,
    totalPostsCount: number
}) => {

    return <>
        <>
            <figure className='relative transition-all duration-300 ease-in-out w-full h-full cursor-pointer'>
                {totalPostsCount > 1 ? <Copy className='absolute top-2 right-2' /> : <></>}

                <div className='absolute top-0 left-0 right-0 hover:bg-black/50
                bottom-0 flex justify-center items-center opacity-0 inset-0
                 hover:opacity-100 transition-all duration-300 ease-in-out'>
                    {/* center  */}
                    <div className='flex space-x-2'>
                        <Heart className='fill-current' />
                        <p className=' font-semibold text-base'>{totalLikesCount || 0}</p>
                        <MessageCircle className='fill-current' />
                        <p className=' font-semibold text-base'>{totalCommentsCount || 0}</p>
                    </div>
                </div>
                <Image
                    fetchPriority="high"
                    src={url}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                    quality={100}
                    priority={true}
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover', // cover, contain, none
                    }}
                    className={cn(`aspect-square hover:opacity-50
                w-full h-full object-cover userNotSelectImg bg-muted`)}
                />
            </figure>
        </>

    </>
}
