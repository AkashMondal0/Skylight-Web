import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import NextAuth_Provider from "@/provider/NextAuth_Provider";
import { Toaster } from "@/components/ui/sonner"
import Redux_Provider from "@/provider/Redux_Provider";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Sky Form',
  description: `
  `,
}
export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Toaster />
          <Redux_Provider>
            <NextAuth_Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {children}
              </ThemeProvider>
            </NextAuth_Provider>
          </Redux_Provider>
        </body>
      </html>
    </>
  )
}
