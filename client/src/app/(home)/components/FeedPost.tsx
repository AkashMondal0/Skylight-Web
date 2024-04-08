/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Heart ,Send,MessageCircle, BookMarked} from 'lucide-react';

const FeedPost = () => {
  return (
    <div>
      {[...Array(50)].map((_, i) => <PostItem key={i} />)}
    </div>
  )
}

const PostItem = ({
  url = "https://github.com/shadcn.png",
}: {
  url?: string
}) => {
  return (
    <div className='max-w-[480px] w-full mx-auto py-4 border-b'>
      <div className='flex justify-between px-2'>
        <div className='flex space-x-2 items-center'>
          <Avatar className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]'>
            <AvatarImage src={url}
              alt="@shadcn" className='rounded-full' />
          </Avatar>
          <div>
            <div className='font-semibold text-base'>Akash Mondal . <span className='font-light text-base text-gray-300'>1d</span></div>
            <div className='text-sm'>Los Angeles, California</div>
          </div>
        </div>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
        </div>
      </div>

      <div className='my-4'>
      <img
        src="https://github.com/shadcn.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      </div>

      <div className=' mt-5 mb-1 mx-3 flex justify-between'>
      <div className='flex space-x-3'>
      <Heart className='w-7 h-7'/>
      <MessageCircle className='w-7 h-7'/>
      <Send className='w-7 h-7'/>
      </div>
      <BookMarked className='w-7 h-7'/>
      </div>

      <div className='mx-3'>
        <div className='font-semibold'>1,000 likes</div>
        {/* close friend comments */}
        <div className='flex space-x-2'>
          <div className='font-semibold'>Akash Mondal</div>
          <div>Great work</div>
        </div>
        {/* load more */}
        <div className='text-sm'>View all 100 comments</div>
      </div>

    </div>
  )
}

export default FeedPost
