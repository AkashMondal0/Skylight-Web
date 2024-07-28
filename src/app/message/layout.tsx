'use client'
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
import {MessageSideBar} from '@/components/Message/MessageSideBar';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className='flex'>
        <NavigationSidebar hideLabel={true} />
        {/* md */}
        <div className='w-full min-h-full hidden md:flex'>
          <MessageSideBar />
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
