import Lg_Navigation from "@/components/home/navigation/lg-navigation"
import StatusbarColorInitial from "@/provider/StatusbarColor"

export default async function RootLayout({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode
}) {

  return (
    <>
    <StatusbarColorInitial/>
      <div className="flex h-full">
        <Lg_Navigation />
        {children}
        {modal}
      </div>
    </>
  )
}
