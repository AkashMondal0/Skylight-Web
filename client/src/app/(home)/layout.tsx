import type { Metadata } from 'next'
import Lg_Navigation from '../components/lg-navigation';
import Sm_Navigation from '../components/sm-navigation';
import Sm_Header from '../components/sm-header';

export const metadata: Metadata = {
  title: 'Feed',
  description: `Sky Media is a social media platform that 
  allows users to share their thoughts and ideas with the world.`,
}
export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div>
          {/* sm device header*/}
          {/* <Sm_Header /> */}
          <div className="flex">
            {/* left side */}
            <Lg_Navigation />
            {children}
          </div>
          {/* sm device footer*/}
          <Sm_Navigation />
        </div>
    </>
  )
}
