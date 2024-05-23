import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Edit Profile • Sky Media',
  description: `Sky Media is a social media platform that 
  allows users to share their thoughts and ideas with the world.`,
}

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className='flex md:pb-0 pb-14'>
        <Lg_Navigation />
        {children}
      </div>
      <Sm_Navigation />
    </>
  )
}
