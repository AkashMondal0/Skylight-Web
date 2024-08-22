/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { LinkButton } from '@/components/ui/LinkButton';
import { configs } from '@/configs';
import { MessageSideBar } from '@/components/Message/MessageSideBar';
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';

export default function Page() {
  return (
    <>
      <div className='w-full h-full flex'>
        <div className='h-dvh flex w-max flex-1'>
          <NavigationSidebar hideLabel />
          <MessageSideBar />
        </div>
        <div className='w-full justify-center hidden md:flex items-center'>
          <div className='text-center'>
            <img src={configs.AppDetails.logoUrl}
              alt='Empty chat'
              className='w-40 h-40 mx-auto' width={200} height={200} />
            <p className='text-xl font-semibold'>Your messages</p>
            <p>Send a message to start a chat.</p>
            <LinkButton href={"#"} className='mt-4 rounded-xl'>
              Start a chat
            </LinkButton>
          </div>
        </div>
      </div>

    </>
  )
}
