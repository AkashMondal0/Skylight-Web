import "./globals.css";
import type { Metadata } from 'next'
import { ThemeProvider } from "@/provider/ThemeProvider";
import NextAuth_Provider from "@/provider/NextAuth_Provider";
import { Toaster } from "@/components/ui/sonner"
import Redux_Provider from "@/provider/Redux_Provider";
import type { Viewport } from 'next'
 
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

export const metadata: Metadata = {
  title: 'SkyLight',
  description: `Sky Media is a social media platform that 
  allows users to share their thoughts and ideas with the world.`,
}
export default function RootLayout({ children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning={false}>
        <body className="ease-in-out duration-300 ">
          <Toaster />
          <Redux_Provider>
            <NextAuth_Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem>
                {/* <AppStart_Provider /> */}
                {children}
                {modal}
              </ThemeProvider>
            </NextAuth_Provider>
          </Redux_Provider>
        </body>
      </html>
    </>
  )
}
