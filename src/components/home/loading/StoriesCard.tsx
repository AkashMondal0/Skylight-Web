/* eslint-disable react/jsx-key */
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'
import {
    Carousel,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function SkeletonStoriesCard() {

    return (
        <div>
            <Carousel
                className="w-full max-w-[580px] mx-auto mt-4
                 mb-2 md:flex hidden justify-around space-x-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton className="h-16 w-16 border-fuchsia-500 
                    border-[3px] p-[2px] rounded-full my-3" key={i} />
                ))}
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <ScrollArea className='max-w-[630px] w-full mb-5 mt-3 mx-auto md:hidden'>
                <div className='flex space-x-2 px-2'>
                    {Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-16 border-fuchsia-500 border-[3px] p-[2px] rounded-full my-3" />)}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
