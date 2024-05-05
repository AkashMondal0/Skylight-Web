import "./globals.css";
import type { Metadata } from 'next'
import { ThemeProvider } from "@/provider/ThemeProvider";
import NextAuth_Provider from "@/provider/NextAuth_Provider";
import { Toaster } from "@/components/ui/sonner"
import Redux_Provider from "@/provider/Redux_Provider";
import Sm_Header from "@/components/home/navigation/sm-header";
import Lg_Navigation from "@/components/home/navigation/lg-navigation";
import Sm_Navigation from "@/components/home/navigation/sm-navigation";


export const metadata: Metadata = {
  title: 'Sky Media',
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
        <head />
        <body className="ease-in-out duration-300">
          <Toaster />
          <Redux_Provider>
            <NextAuth_Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem>
                {/* <AppStart_Provider> */}
                  <div>
                    {/* sm device header*/}
                    <Sm_Header />
                    <div className="flex">
                      {/* left side */}
                      <Lg_Navigation />
                      {children}
                    </div>
                    {/* sm device footer*/}
                    <Sm_Navigation />
                  </div>
                  {modal}
                {/* </AppStart_Provider> */}
              </ThemeProvider>
            </NextAuth_Provider>
          </Redux_Provider>
        </body>
      </html>
    </>
  )
}
