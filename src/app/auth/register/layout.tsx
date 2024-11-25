import type { Metadata } from 'next'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sky Form - Register',
  description: ``,
}
export default async function RegisterLayout({ children }: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const Cookies = cookieStore.get("skylight-token");
  if (Cookies) {
    return redirect('/');
  }

  return (
    <>
      {children}
    </>
  )
}
