import "./globals.css";
import type { Metadata } from 'next'
import { ThemeProvider } from "@/provider/ThemeProvider";
import NextAuth_Provider from "@/provider/NextAuth_Provider";
import { Toaster } from "@/components/ui/sonner"
import Redux_Provider from "@/provider/Redux_Provider";
import type { Viewport } from 'next'
import Socket_Provider from "@/provider/Socket_Provider";
import PageState_Provider from "@/provider/PageState_Provider";

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
          <Redux_Provider>
            <NextAuth_Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem>
                <Socket_Provider>
                  <PageState_Provider>
                    <Toaster />
                    {children}
                    {modal}
                  </PageState_Provider>
                </Socket_Provider>
              </ThemeProvider>
            </NextAuth_Provider>
          </Redux_Provider>
        </body>
      </html>
    </>
  )
}
