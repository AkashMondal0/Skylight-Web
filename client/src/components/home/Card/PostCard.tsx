"use client";
import React from 'react'
import { Heart, Send, MessageCircle, BookMarked } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import SkyAvatar from '@/components/sky/SkyAvatar';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/slice/modal';
import { FeedPost } from '@/types';

const PostItem = ({
  feed,
}: {
  feed: FeedPost
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <div className='max-w-[480px] w-full mx-auto py-4 border-b'>
      <div className='flex justify-between px-2'>
        <div className='flex space-x-2 items-center cursor-pointer' onClick={() => {
          router.push(`/${feed.authorData.username}`)
        }}>
          <SkyAvatar url={feed.authorData.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]' />
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
              <CarouselItem key={index} className='flex flex-col m-auto'>
                <Image
                  // loading="lazy"
                  src={url}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                  quality={100}
                  priority={true}
                  fetchPriority="high"
                  sizes="(min-width: 808px) 50vw, 100vw"
                  className={cn('h-auto w-full cursor-pointer userNotSelectImg bg-muted')}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='flex'>
            <CarouselPrevious variant={"default"} className='md:flex hidden left-2' />
            <CarouselNext variant={"default"} className='md:flex hidden right-2' />
          </div>
        </Carousel>
      </div>

      <div className=' mt-5 mb-1 mx-3 flex justify-between'>
        <div className='flex space-x-3'>
          <Heart className={`w-7 h-7 cursor-pointer  ${feed.alreadyLiked ? "text-red-500 fill-red-500" : ""}`} />
          <MessageCircle className='w-7 h-7 cursor-pointer hidden sm:block' onClick={() => router.push(`/post/${feed.id}`)} />
          {/* sm */}
          <MessageCircle className='w-7 h-7 cursor-pointer sm:hidden block' onClick={() => router.push(`/post/${feed.id}/comments`)} />

          <Send className='w-7 h-7 cursor-pointer' />
        </div>
        <BookMarked className='w-7 h-7 cursor-pointer' />
      </div>

      <div className='mx-3 space-y-2'>
        {/* lg*/}
        <div className='font-semibold cursor-pointer sm:hidden block' onClick={() => {
          router.push(`/post/${feed.id}/liked_by`)
        }}>{feed.likeCount} likes</div>
        {/* sm */}
        <div className='font-semibold cursor-pointer hidden sm:block' onClick={() => {
          dispatch(openModal({
            modalName: "Liked",
            modalData: {
              postId: feed.id
            }
          }))
        }}>{feed.likeCount} likes</div>

        {/* close friend comments */}
        <div className='flex space-x-2'>
          <div className='font-semibold cursor-pointer ' onClick={() => {
            router.push(`/${feed.authorData.email}`)
          }}>{feed.authorData.username}</div>
          <div>{feed.caption}</div>
        </div>
        {/* load more */}

        {/* lg*/}
        <div className='text-sm cursor-pointer hidden sm:block'
          onClick={() => {
            router.push(`/post/${feed.id}`)
          }}>View all {feed.commentCount} comments</div>
        {/* sm */}
        <div className='text-sm cursor-pointer sm:hidden block'
          onClick={() => {
            router.push(`/post/${feed.id}/comments`)
          }}>View all {feed.commentCount} comments</div>
      </div>

    </div>
  )
}

export default PostItem
