'use client'
import { MessageSideBar } from '@/components/Message/MessageSideBar';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {

  return (
    <>
      {/* md */}
      <div className='w-full min-h-full hidden md:flex'>
        <MessageSideBar />
        {children}
      </div>
      {/* sm */}
      <div className='w-full min-h-dvh md:hidden flex'>
        {children}
      </div>
    </>
  )
}
