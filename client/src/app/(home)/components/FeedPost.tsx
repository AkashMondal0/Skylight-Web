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
import { FeedPost, PostFeedState } from '@/redux/slice/post-feed';
import { useRouter } from 'next/navigation';

const FeedPostCard = ({ feeds }: { feeds: PostFeedState }) => {
  return (
    <div>
      {feeds.feedPosts?.map((feed, i) => <PostItem key={i} feed={feed} />)}
    </div>
  )
}

const PostItem = ({
  feed
}: {
  feed: FeedPost
}) => {
  const router = useRouter()
  const OpenModal = () => {
    console.log('open modal')
    router.push(`/post/${feed.id}`)
  }
  return (
    <div className='max-w-[480px] w-full mx-auto py-4 border-b'>
      <div className='flex justify-between px-2'>
        <div className='flex space-x-2 items-center'>
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
              <CarouselItem key={index} className='h-[500px]'>
                <img
                  src={url}
                  width={500}
                  height={500}
                  className='object-cover w-full h-full'
                  alt="Picture of the author"
                /></CarouselItem>
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
          <Heart className='w-7 h-7 cursor-pointer' />
          <MessageCircle className='w-7 h-7 cursor-pointer' onClick={OpenModal} />
          <Send className='w-7 h-7 cursor-pointer' />
        </div>
        <BookMarked className='w-7 h-7 cursor-pointer' />
      </div>

      <div className='mx-3'>
        <div className='font-semibold'>{feed.likeCount} likes</div>
        {/* close friend comments */}
        <div className='flex space-x-2'>
          <div className='font-semibold'>Akash Mondal</div>
          <div>Great work</div>
        </div>
        {/* load more */}
        <div className='text-sm cursor-pointer' onClick={OpenModal}>View all {feed.commentCount} comments</div>
      </div>

    </div>
  )
}

export default FeedPostCard
