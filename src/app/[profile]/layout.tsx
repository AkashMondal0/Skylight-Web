import Lg_Navigation from "@/components/home/navigation/lg-navigation"
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
export default async function RootLayout({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode
}) {

  return (
    <>
      <div className="flex h-full md:py-0 py-14">
        <Lg_Navigation />
        {children}
        {modal}
      </div>
    </>
  )
}
