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
export default function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-dvh">
      {children}
    </div>
  )
}
