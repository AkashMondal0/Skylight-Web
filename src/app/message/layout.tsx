import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import SidebarMessage from '@/components/message/Sidebar';
import type { Metadata } from 'next'
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Message',
  description: `Sky Media is a social media platform that 
  allows users to share their thoughts and ideas with the world.`,
}

const RenderSidebar = async () => {
  await new Promise((r) => setTimeout(r, 1000))
  // const data = await getProfileChatListApi('1')

  return <SidebarMessage />
}

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex'>
        <Lg_Navigation hideLabel />
        <div className='w-full min-h-full flex'>
          <Suspense fallback={<div>Loading...</div>}>
            <RenderSidebar />
          </Suspense>
          <div className='w-full h-full md:block hidden'>
            {children}
          </div>
        </div>
      </div>
      <Sm_Navigation />
    </>
  )
}
