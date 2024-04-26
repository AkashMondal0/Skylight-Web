'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
const Stories_bar = () => {
  return (
    <>
      <Carousel
        className="w-full max-w-sm mx-auto mt-4 mb-2 md:flex hidden">
        <CarouselContent>
          {Array.from({ length: 50 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/5">
              <StoryAvatar />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ScrollArea className='max-w-[630px] w-full mb-5 mt-3 mx-auto md:hidden'>
        <div className='flex space-x-2 px-2'>
          {Array(100).fill(0).map((_, i) => <StoryAvatar key={i} />)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}

const StoryAvatar = ({
  url = "/user.jpg",
  label = "loading"
}: {
  url?: string
  label?: string
}) => {
  return <div>
    <Avatar className='h-16 w-16 mx-auto border-fuchsia-500 border-[3px] p-[2px]'>
      <AvatarImage src={url} alt="@shadcn" className='rounded-full' />
      {/* <AvatarFallback>{label}</AvatarFallback> */}
    </Avatar>
    <div className="text-xs font-normal text-center">akash</div>
  </div>
}

export default Stories_bar
