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
import { cn } from '@/lib/utils';
import SkyAvatar from '@/components/sky/SkyAvatar';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/slice/modal';
import { FeedPost } from '@/types';
import { useSession } from 'next-auth/react';
import OptimizedImage from '@/components/sky/SkyImage';
import { createPostLikeApi, destroyPostLikeApi } from '@/redux/services/post';

const PostItem = ({
  feed,
}: {
  feed: FeedPost
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const session = useSession().data?.user

  const handleLikeAndUndoLike = () => {
    if (feed) {
      if (feed.is_Liked) {
        // unlike
        dispatch(destroyPostLikeApi(feed.id) as any)
      } else {
        // like
        dispatch(createPostLikeApi(feed.id) as any)
      }
    }
  }

  return (
    <div className='max-w-[480px] w-full mx-auto py-4 border-b'>
      <div className='flex justify-between px-2'>
        <div className='flex space-x-2 items-center cursor-pointer' onClick={() => {
          router.push(`/${feed.user.username}`)
        }}>
          <SkyAvatar url={feed.user.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]' />
          <div>
            <div className='font-semibold text-base'>{feed.user.username} .
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
                <OptimizedImage
                  src={url}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  fetchPriority={"high"}
                  sizes={"(min-width: 808px) 50vw, 100vw"}
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
          <Heart className={`w-7 h-7 cursor-pointer  ${feed.is_Liked ? "text-red-500 fill-red-500" : ""}`} onClick={handleLikeAndUndoLike} />
          <MessageCircle className='w-7 h-7 cursor-pointer hidden sm:block' onClick={() => router.push(`/post/${feed.id}`)} />
          {/* sm */}
          <MessageCircle className='w-7 h-7 cursor-pointer sm:hidden block' onClick={() => router.push(`/post/${feed.id}`)} />

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
            router.push(`/${feed.user.email}`)
          }}>{feed.user.username}</div>
          <div>{feed.content}</div>
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

    </div >
  )
}

export default PostItem


export const PostItemDummy = ({
  feed,
}: {
  feed: FeedPost
}) => {

  return (
    <div className='max-w-[480px] w-full mx-auto py-4 border-b'>
      <div className='flex justify-between px-2'>
        <div className='flex space-x-2 items-center cursor-pointer'>
          <SkyAvatar url={feed.user.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]' />
          <div>
            <div className='font-semibold text-base'>{feed.user.username} .
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
                <OptimizedImage
                  src={url}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  fetchPriority={"high"}
                  sizes={"(min-width: 808px) 50vw, 100vw"}
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
          <Heart className={`w-7 h-7 cursor-pointer  ${feed.is_Liked ? "text-red-500 fill-red-500" : ""}`} />
          <MessageCircle className='w-7 h-7 cursor-pointer hidden sm:block' />
          {/* sm */}
          <MessageCircle className='w-7 h-7 cursor-pointer sm:hidden block' />

          <Send className='w-7 h-7 cursor-pointer' />
        </div>
        <BookMarked className='w-7 h-7 cursor-pointer' />
      </div>

      <div className='mx-3 space-y-2'>
        {/* lg*/}
        <div className='font-semibold cursor-pointer sm:hidden block'>{feed.likeCount} likes</div>
        {/* sm */}
        <div className='font-semibold cursor-pointer hidden sm:block'>{feed.likeCount} likes</div>

        {/* close friend comments */}
        <div className='flex space-x-2'>
          <div className='font-semibold cursor-pointer'>{feed.user.username}</div>
          <div>{feed.content}</div>
        </div>
        {/* load more */}

        {/* lg*/}
        <div className='text-sm cursor-pointer hidden sm:block'>View all {feed.commentCount} comments</div>
        {/* sm */}
        <div className='text-sm cursor-pointer sm:hidden block'>View all {feed.commentCount} comments</div>
      </div>

    </div>
  )
}