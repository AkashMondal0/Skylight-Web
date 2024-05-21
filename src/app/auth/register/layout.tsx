import type { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sky Form - Register',
  description: ``,
}
export default async function RegisterLayout({ children }: {
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
