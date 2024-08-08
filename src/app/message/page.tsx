import React from 'react'
import OptimizedImage from '@/components/sky/SkyImage';
import { LinkButton } from '@/components/ui/LinkButton';
import { configs } from '@/configs';

export default function Page() {
  return (
   <>
    <div className='w-auto mx-auto hidden md:flex items-center'>
      <div className='text-center'>
        <OptimizedImage
          src={configs.AppDetails.logoUrl}
          alt='Empty chat'
          className='w-40 h-40 mx-auto userNotSelectImg' width={200} height={200} />
        <p className='text-xl font-semibold'>Your messages</p>
        <p>Send a message to start a chat.</p>
        <LinkButton href={"#"} className='mt-4 rounded-xl'>
          Start a chat
        </LinkButton>
      </div>
    </div>
   </>
  )
}
