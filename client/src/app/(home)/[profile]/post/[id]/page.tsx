/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const page = () => {
  return <PostR />
}

export default page


export const PostR = () => {
  return <>
    <Dialog open>
      <DialogContent className="p-0 flex">
        <div className='flex-1'>
          <Carousel>
            <CarouselContent>
              {Array(10).fill(0).map((url, index) => (
                <CarouselItem key={index}>
                  <figure className='h-auto'>
                    <img
                      src={"https://source.unsplash.com/random"}
                      className='rounded-xl'
                      alt="Picture of the author"
                    />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='flex'>
              <CarouselPrevious className='md:flex hidden' />
              <CarouselNext className='md:flex hidden' />
            </div>
          </Carousel>
        </div>
        <div className="hidden flex-col w-full md:flex max-w-[500px] flex-1">
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
        </div>
      </DialogContent>
    </Dialog>
  </>
}
