'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'

const Stories_bar = () => {
  return (
    <ScrollArea className='max-w-[630px] w-full mb-5 mt-3 mx-auto'>
      <div className='flex space-x-2 px-2'>
        {Array(100).fill(0).map((_, i) => <StoryAvatar key={i} />)}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

const StoryAvatar = ({
  url = "https://github.com/shadcn.png",
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
