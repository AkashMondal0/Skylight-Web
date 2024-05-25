import { UserCardListSkeleton } from '@/components/message/loading';
import SidebarMessage from '@/components/message/Sidebar';
import OptimizedImage from '@/components/sky/SkyImage';
import { Button } from '@/components/ui/button';
import { LinkButton } from '@/components/ui/LinkButton';
import { configs } from '@/configs';
import { RestApiPayload } from '@/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'


async function getProfileChatListApi(id: string) {
  try {
    const response = await fetch(`${configs.appUrl}/api/v1/profile/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `${cookies().get("token-auth")?.value}`
      },
      cache: "no-store"
    });
    const res = await response.json() as RestApiPayload<{}>;
    if (res.code === 0) {
      throw new Error(res.message);
    }
    return res.data;
  } catch (error) {
    console.log(error)
    return notFound()
  }
}

const RenderSidebar = async () => {
  await new Promise((r) => setTimeout(r, 5000))
  // const data = await getProfileChatListApi('1')

  return <SidebarMessage />
}

const Page = () => {

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
        <Suspense fallback={<UserCardListSkeleton/>}>
          <RenderSidebar />
        </Suspense>
      </div>
    </>
  )
}

export default Page
