import { configs } from "@/configs"
import { NotFoundMetadata, metaRobots } from "@/types/Metadata"
import { Metadata } from "next"
interface AuthorData {
  id: string
  username: string
  email: string
  name: string
  profilePicture?: string
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
}
export async function generateMetadata({ params: { profile } }: any): Promise<Metadata> {
  const res = await fetch(`${configs.serverApi.baseUrl}/v1/users/${profile}`, { cache: "no-cache" })

  if (!res.ok) return NotFoundMetadata

  const data = await res.json() as AuthorData

  if (!data) return NotFoundMetadata
  if (!data?.name) return NotFoundMetadata

  const title = `${data?.name} (@${data.username}) • Skylight photos and videos`
  const description = `${data?.followerCount} Followers, ${data?.followingCount} Following, ${data?.postCount} posts - See Skylight photos and video form(@${data.username})`

  return {
    title: title,
    description: description,
    generator: 'SkyLight',
    applicationName: `${configs.AppDetails.name} `,
    referrer: 'origin-when-cross-origin',
    keywords: [data.username, data.name, 'SkyLight'],
    authors: [
      { name: data?.name, url: `https://skysolo.me/${data.username}` },
      // profile user other social account links
      // { name: 'Akash Mondal', url: 'https://github.com/akashmondal0' },
      // { name: 'Akash Mondal', url: "https://www.instagram.com/iamskysolo/" },
      // { name: 'Akash Mondal', url: 'https://www.linkedin.com/in/akashmondal0' }
    ],
    creator: data.name,
    publisher: data.username,
    metadataBase: new URL(`${configs.AppDetails.appUrl}/${data.username}`),
    category: `Public figure`,
    // openGraph
    openGraph: {
      title: title,
      description: description,
      url: `${configs.AppDetails.appUrl}/${data.username}`,
      siteName: 'SkyLight',
      locale: "en-IN",
      type: 'website',
      images: [
        {
          type: "image/png",
          width: 200,
          height: 200,
          alt: "image not found",
          url: data?.profilePicture ?? configs.AppDetails.primaryLightLogo
        },
        {
          type: "image/png",
          width: 800,
          height: 600,
          alt: "image not found",
          url: data?.profilePicture ?? configs.AppDetails.primaryLightLogo
        },
      ]
    },
    // twitter
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      site: '@SkyLightApp',
      creator: `@${data.username}`,
      images: [data?.profilePicture ?? configs.AppDetails.primaryLightLogo],
    },
    // robots
    robots: metaRobots
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
