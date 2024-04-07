import type { Metadata } from 'next'
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
      {children}
    </>
  )
}
