import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
import SidebarMessageClient from '@/components/message/Sidebar';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'SkyLight • Message',
  description: `Sky Media is a social media platform that 
  allows users to share their thoughts and ideas with the world.`,
}
export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className='flex'>
        <NavigationSidebar hideLabel />
        {/* md */}
        <div className='w-full min-h-full hidden md:flex'>
          <SidebarMessageClient />
          {children}
        </div>
        {/* sm */}
        <div className='w-full min-h-dvh md:hidden flex'>
          {children}
        </div>
      </div>
    </>
  )
}
