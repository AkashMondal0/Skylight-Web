"use client"
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Copy, Heart, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FeedPost } from '@/types'

export const ImageComponent = ({
    data
}: {
    data: FeedPost
}) => {
    const router = useRouter()

    return (
        <>
            <figure className='relative transition-all duration-300 ease-in-out w-full h-full cursor-pointer' onClick={() => router.push(`/post/${data.id}`)}>
                {data.fileUrl.length > 1 ? <Copy className='absolute top-2 right-2' /> : <></>}

                <div className='absolute top-0 left-0 right-0 hover:bg-black/50
            bottom-0 flex justify-center items-center opacity-0 inset-0
             hover:opacity-100 transition-all duration-300 ease-in-out'>
                    {/* center  */}
                    <div className='flex space-x-2'>
                        <Heart className='fill-current' />
                        <p className=' font-semibold text-base'>{data.likeCount || 0}</p>
                        <MessageCircle className='fill-current' />
                        <p className=' font-semibold text-base'>{data.commentCount || 0}</p>
                    </div>
                </div>
                <Image
                    fetchPriority="high"
                    src={data.fileUrl[0]}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                    quality={100}
                    loading="lazy"
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover', // cover, contain, none
                    }}
                    className={cn(`aspect-square hover:opacity-50
            w-full h-full object-cover userNotSelectImg bg-muted`)}
                />
            </figure>
        </>
    )
}
