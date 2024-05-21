import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sky Form - Login',
  description: ``,
}
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoginLayout({ children }: {
  children: React.ReactNode;
}) {
  const login = await getServerSession();

  if (login) {
    return redirect('/');
  }

  return (
    <>
      {children}
    </>
  )
}
