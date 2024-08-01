import React, { memo } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import OptimizedImage from '../sky/SkyImage'
import { Post } from '@/types'
import { cn } from '@/lib/utils'

const PostImage = memo(function PostImage({
    post,
    onImageError
}: {
    post: Post | null
    onImageError?:()=>void
}) {

    if (!post) return null

    return (
        <div className='px-[2px] w-auto h-auto m-auto'>
            <div className='my-4 border-[1px] rounded-xl overflow-hidden'>
                <Carousel>
                    <CarouselContent>
                        {post.fileUrl.map((url, index) => (
                            <CarouselItem key={index} className='min-h-80 flex items-center m-auto'>
                                <OptimizedImage
                                    showErrorIcon
                                    src={url}
                                    width={500}
                                    height={500}
                                    onError={onImageError}
                                    alt="Picture of the author"
                                    fetchPriority={"high"}
                                    sizes={"(min-width: 808px) 50vw, 100vw"}
                                    className={cn('h-auto w-full cursor-pointer userNotSelectImg bg-muted rounded-xl')} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className='flex'>
                        <CarouselPrevious variant={"outline"} className='md:flex hidden left-2' />
                        <CarouselNext variant={"outline"} className='md:flex hidden right-2' />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}, ((pre: any, next: any) => {
    return pre.post.id == next.post.id
}))

export default PostImage