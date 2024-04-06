import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Sky Form - Login',
  description: ``,
}
export default function LoginLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  )
}
