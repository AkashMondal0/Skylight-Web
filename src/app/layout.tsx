import "./globals.css";
import type { Metadata } from 'next'
import { ThemeProvider } from "@/provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"
import Redux_Provider from "@/provider/Redux_Provider";
import type { Viewport } from 'next'
import Socket_Provider from "@/provider/Socket_Provider";
import TopContext from "@/provider/TopContext";
import { AppMetadata } from "@/types/Metadata";

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

export const metadata: Metadata = AppMetadata


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
            <ThemeProvider
              attribute="class"
              defaultTheme="light">
              <Socket_Provider>
                <TopContext />
                <Toaster />
                {children}
                {modal}
              </Socket_Provider>
            </ThemeProvider>
          </Redux_Provider>
        </body>
      </html>
    </>
  )
}
