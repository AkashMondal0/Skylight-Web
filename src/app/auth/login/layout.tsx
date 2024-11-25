import type { Metadata } from 'next'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'SkyLight - Login',
  description: ``,
}

export default async function LoginLayout({ children }: {
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
