import { configs } from "@/configs"
import { User } from "@/types"
import { DefaultMetadata } from "@/types/Metadata"
import { Metadata } from "next"

export async function generateMetadata({ params: { profile } }: any): Promise<Metadata> {
  const res = await fetch(`${configs.serverApi.baseUrl}/v1/users/${profile}`)

  if (!res.ok) return DefaultMetadata

  const data = await res.json() as User

  if (!data) return DefaultMetadata
  if (!data?.name) return DefaultMetadata

  return {
    title: `${data?.name} (@${data.username}) • Skylight photos and videos`,
    description: `${data?.postCount} posts - See Skylight photos and video form (@${data.username})`,
    openGraph: {
      title: `${data?.name} (@${data.username}) • Skylight photos and videos`,
      description: `${data?.postCount} posts - See Skylight photos and video form (@${data.username})`,
      images: [
        {
          type: "image/png",
          width: 800,
          height: 600,
          alt: "image not found",
          url: data?.profilePicture ?? "/skylight_logo.png"
        },
        {
          type: "image/png",
          width: 200,
          height: 200,
          alt: "image not found",
          url: data?.profilePicture ?? "/skylight_logo.png"
        }
      ]
    }
  }
}

export default async function RootLayout({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode
}) {

  return (
    <>
      {children}
      {modal}
    </>
  )
}
