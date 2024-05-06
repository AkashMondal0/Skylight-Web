/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const PostFeedModal = () => {
  const router = useRouter()
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }

  const arr = [
    "https://nngujjeumggzpchjxdpn.supabase.co/storage/v1/object/public/skymedia/f6d08926-5cab-4f20-9ec6-de69e1ca2ec6/feedPosts/Olivia_Rodrigo.png",
    "https://nngujjeumggzpchjxdpn.supabase.co/storage/v1/object/public/skymedia/f6d08926-5cab-4f20-9ec6-de69e1ca2ec6/feedPosts/olivia-sanabia-04-28-2022-7.jpg",
    "https://nngujjeumggzpchjxdpn.supabase.co/storage/v1/object/public/skymedia/testmondal/feedPosts/IMG_20240203_033153.jpg",
  ]
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="p-0 flex max-w-none w-auto h-[90dvh] ">
        <div className='flex-1 m-auto ml-4'>
          <Carousel >
            <CarouselContent>
              {arr.map((url, index) => (
                <CarouselItem key={index} className='m-auto'>
                  <Image
                    loading='lazy'
                    src={url}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    sizes="100vw"
                    quality={100}
                    className='w-auto h-auto cursor-default border rounded-lg userNotSelectImg'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='flex'>
              <CarouselPrevious className='md:flex hidden left-2' />
              <CarouselNext className='md:flex hidden  right-2' />
            </div>
          </Carousel>
        </div>
        <div className="flex flex-col max-w-[500px] w-full flex-1">
          <div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
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

          <ScrollArea className='h-auto'>
            {Array(100).fill(0).map((_, index) => (
              <div key={index} className="flex p-4 my-auto">
                <Avatar className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]'>
                  <AvatarImage src={"/user.jpg"}
                    alt="@shadcn" className='rounded-full' />
                </Avatar>
                <div className="flex flex-col ml-4">
                  <p className="break-all">Akash Mondal Lorem
                  </p>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className='w-full bg-background p-2'>
            <input type="text" 
            placeholder='Add a comment' 
            className='w-full h-12 p-4 outline-none rounded-2xl bg-background' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostFeedModal
