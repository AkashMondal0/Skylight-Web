"use client"
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Copy, Heart, MessageCircle, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FeedPost } from '@/types'
import { PostError } from '@/components/error/image.error'
type status = "error" | "loading" | "success"
export const ImageComponent = ({
    data
}: {
    data: FeedPost
}) => {
    const router = useRouter()
    const [status, setStatus] = React.useState<status>("loading")

    return (
        <>
            <figure className='relative transition-all duration-300 ease-in-out w-full h-full cursor-pointer' onClick={() => {
                if (!data?.isDummy) {
                    router.push(`/post/${data.id}`)
                }
            }}>
                {data.fileUrl.length > 1 ? <Copy className='absolute top-2 right-2 text-white' /> : <></>}

                <div className='absolute top-0 left-0 right-0 hover:bg-black/50
            bottom-0 flex justify-center items-center opacity-0 inset-0
             hover:opacity-100 transition-all duration-300 ease-in-out'>
                    {/* center  */}
                    {status === "error" ? <></> :
                        <div className='flex space-x-2'>
                            <Heart className='fill-current' />
                            <p className=' font-semibold text-base'>{data.likeCount || 0}</p>
                            <MessageCircle className='fill-current' />
                            <p className=' font-semibold text-base'>{data.commentCount || 0}</p>
                        </div>}
                </div>
                {status === "error" ? <PostError /> :
                    <Image
                        fetchPriority="high"
                        src={data.fileUrl[0]}
                        width={300}
                        height={300}
                        alt=""
                        quality={75}
                        priority={true}
                        sizes="(min-width: 808px) 20vw, 40vw"
                        style={{
                            objectFit: 'cover', // cover, contain, none
                        }}
                        onError={(e) => {
                            setStatus("error")
                        }}
                        onLoad={() => {
                            setStatus("success")
                        }}
                        className={cn(`aspect-square hover:opacity-50 
                        w-full h-full object-cover userNotSelectImg 
                        bg-muted`, status === "loading" ? "animate-pulse" : "")} />}
            </figure>
        </>
    )
}
