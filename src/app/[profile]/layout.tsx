import {NavigationSidebar} from "@/components/Navigation/NavigationSidebar"

export default async function RootLayout({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode
}) {

  return (
    <>
      <div className="flex h-full">
        <NavigationSidebar />
        {children}
        {modal}
      </div>
    </>
  )
}
