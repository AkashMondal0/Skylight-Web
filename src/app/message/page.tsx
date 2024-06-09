import { UserCardListSkeleton } from '@/components/message/loading';
import OptimizedImage from '@/components/sky/SkyImage';
import { LinkButton } from '@/components/ui/LinkButton';
import React, { Suspense } from 'react'
import ChatListSidebar from '@/components/message/chatList';

export default function Page() {
  return (
    <>
      {/* md */}
      <div className='w-full h-full md:flex hidden justify-center items-center'>
        <div className='text-center'>
          <OptimizedImage
            src='/logo.png'
            alt='Empty chat'
            className='w-60 h-60 mx-auto' width={200} height={200} />
          <p className='text-xl font-semibold'>Your messages</p>
          <p>Send a message to start a chat.</p>
          <LinkButton href={"#"} className='mt-4 rounded-xl'>
            Start a chat
          </LinkButton>
        </div>
      </div>
      {/* sm */}
      <div className='w-full h-full flex md:hidden'>
        <ChatListSidebar />
      </div>
    </>
  )
}
