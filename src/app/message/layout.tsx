import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import ChatListSidebar from '@/components/message/chatList';
import type { Metadata } from 'next'
import { Viewport } from "next"
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'light' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
export const metadata: Metadata = {
  title: 'Message',
  description: `Sky Media is a social media platform that 
  allows users to share their thoughts and ideas with the world.`,
}

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex'>
        <Lg_Navigation hideLabel />
        {/* md */}
        <div className='w-full min-h-full hidden md:flex'>
        <ChatListSidebar/>
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
