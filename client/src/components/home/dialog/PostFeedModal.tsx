/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'

const PostFeedModal = () => {
  const router = useRouter()
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="p-0 flex max-w-none w-[75dvw] h-[90dvh] overflow-y-auto">
        <div className='aspect-video w-full h-full'>
          <Carousel >
            <CarouselContent>
              {Array(10).fill(0).map((url, index) => (
                <CarouselItem key={index}>
                  <img
                    src={"https://source.unsplash.com/random/800x600?sig=1"}
                    className='rounded-xl object-contain'
                    alt="Picture of the author"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='flex'>
              <CarouselPrevious className='md:flex hidden' />
              <CarouselNext className='md:flex hidden' />
            </div>
          </Carousel>
        </div>
        <div className="flex flex-col max-w-[500px] w-full">
          <div className="flex justify-between bg-background
      items-center p-4 border-b h-20 z-10 sticky top-0">
            <div className="flex gap-2 items-center">
              <Avatar className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]'>
                <AvatarImage src={"/user.jpg"}
                  alt="@shadcn" className='rounded-full' />
              </Avatar>
              <div className="font-semibold text-lg">User Name</div>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
              </svg>
            </div>
          </div>

          <ScrollArea className='h-96'>
            {Array(10).fill(0).map((_, index) => (
              <div key={index} className="flex items-center p-4 border-b">
                <Avatar className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]'>
                  <AvatarImage src={"/user.jpg"}
                    alt="@shadcn" className='rounded-full' />
                </Avatar>
                <div className="flex flex-col ml-4">
                  <div className="font-semibold">User Name</div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostFeedModal
