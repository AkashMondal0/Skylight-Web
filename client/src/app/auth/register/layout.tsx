import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Sky Form - Register',
  description: ``,
}
export default function RegisterLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  )
}
