import SidebarMessage from '@/components/message/Sidebar';
import { configs } from '@/configs';
import { RestApiPayload } from '@/types';
import { cookies } from 'next/headers';
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
  await new Promise((r) => setTimeout(r, 1000))
  // const data = await getProfileChatListApi('1')

  return <SidebarMessage />
}

const Page = () => {

  return (
    <>
      {/* md */}
      <div className='w-full h-full md:block hidden'>
        Your messages
        <div>Send a message to start a chat.</div>
      </div>
      {/* sm */}
      <div className='w-full h-full flex md:hidden'>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderSidebar />
        </Suspense>
      </div>
    </>
  )
}

export default Page
