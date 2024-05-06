"use client";
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Heart, Send, MessageCircle, BookMarked } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FeedPost } from '@/redux/slice/post-feed';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PostItem = ({
  feed
}: {
  feed: FeedPost
}) => {
  const router = useRouter()
  const OpenModal = () => {
    router.push(`/post/${feed.id}`)
  }
  return (
    <div className='max-w-[480px] w-full mx-auto py-4 border-b'>
      <div className='flex justify-between px-2'>
        <div className='flex space-x-2 items-center cursor-pointer' onClick={() => {
          router.push(`/${feed.authorData.username}`)
        }}>
          <Avatar className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]'>
            <AvatarImage src={feed.authorData.profilePicture || "/user.jpg"}
              alt="@shadcn" className='rounded-full' />
          </Avatar>
          <div>
            <div className='font-semibold text-base'>{feed.authorData.username} .
              <span className='font-light text-base'>1d</span>
            </div>
            <div className='text-sm'>Los Angeles, California</div>
          </div>
        </div>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
            <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
          </svg>
        </div>
      </div>

      <div className='my-4'>
        <Carousel>
          <CarouselContent>
            {feed.fileUrl.map((url, index) => (
              <CarouselItem key={index} className='flex flex-col m-auto' onClick={OpenModal}>
                <Image
                  loading='lazy'
                  src={url}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  sizes="100vw"
                  className='rounded-lg border h-auto w-full cursor-pointer userNotSelectImg'
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

      <div className=' mt-5 mb-1 mx-3 flex justify-between'>
        <div className='flex space-x-3'>
          <Heart className={`w-7 h-7 cursor-pointer  ${feed.alreadyLiked ? "text-red-500 fill-red-500" : ""}`} />
          <MessageCircle className='w-7 h-7 cursor-pointer' onClick={OpenModal} />
          <Send className='w-7 h-7 cursor-pointer' />
        </div>
        <BookMarked className='w-7 h-7 cursor-pointer' />
      </div>

      <div className='mx-3 space-y-2'>
        <div className='font-semibold cursor-pointer' onClick={() => {
          router.push(`/post/${feed.id}/liked_by`)
        }}>{feed.likeCount} likes</div>
        {/* close friend comments */}
        <div className='flex space-x-2'>
          <div className='font-semibold cursor-pointer ' onClick={() => {
            router.push(`/${feed.authorData.email}`)
          }}>{feed.authorData.username}</div>
          <div>{feed.caption}</div>
        </div>
        {/* load more */}
        <div className='text-sm cursor-pointer'
          onClick={() => {
            router.push(`/post/${feed.id}/comments`)
          }}>View all {feed.commentCount} comments</div>
      </div>

    </div>
  )
}

export default PostItem
