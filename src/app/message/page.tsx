import SidebarMessageClient from '@/components/message/Sidebar';
import OptimizedImage from '@/components/sky/SkyImage';
import { LinkButton } from '@/components/ui/LinkButton';
import React from 'react'

export default function Page() {
  return (
    <>
      {/* md */}
      <div className='w-full h-full md:flex hidden justify-center items-center'>
        <div className='text-center'>
          <OptimizedImage
            src='/skylight_logo.png'
            alt='Empty chat'
            className='w-40 h-40 mx-auto m-20 userNotSelectImg' width={200} height={200} />
          <p className='text-xl font-semibold'>Your messages</p>
          <p>Send a message to start a chat.</p>
          <LinkButton href={"#"} className='mt-4 rounded-xl'>
            Start a chat
          </LinkButton>
        </div>
      </div>
      {/* sm */}
      <div className='w-full h-full flex md:hidden'>
        <SidebarMessageClient />
      </div>
    </>
  )
}
