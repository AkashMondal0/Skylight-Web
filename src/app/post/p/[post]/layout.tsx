import { configs } from "@/configs";
import { AuthorData } from "@/types";
import { NotFoundMetadata, metaRobots } from "@/types/Metadata";
import { Metadata } from "next";

interface PostData {
  id: string,
  content: string,
  fileUrl: string[],
  likeCount: number,
  commentCount: number,
  user: AuthorData
  createdAt: Date
}

export async function generateMetadata({ params: { post } }: { params: { post: string } }): Promise<Metadata> {
  const res = await fetch(`${configs.serverApi.baseUrl}/v1/post/${post}`)

  if (!res.ok) return NotFoundMetadata
  const data = await res.json() as PostData

  if (!data) return NotFoundMetadata
  if (!data?.user?.name) return NotFoundMetadata

  const title = `${data.user.name} on Skylight: ${data.content}`;
  const description = `Posted on: ${new Date(data.createdAt).toDateString()}, Likes: ${data.likeCount}, Comments: ${data.commentCount}, Image: ${data.fileUrl[0]}`;

  return {
    title: title,
    description: description,
    // 
    generator: 'SkyLight',
    applicationName: `${configs.AppDetails.name} `,
    referrer: 'origin-when-cross-origin',
    keywords: [data.user.username, data.user.name, 'SkyLight'],
    authors: [{ name: data?.user.name, url: `https://skysolo.me/${data.user.username}` }],
    creator: data.user.name,
    publisher: data.user.username,
    metadataBase: new URL(`${configs.AppDetails.appUrl}/p/${data.id}`),
    //
    openGraph: {
      title: title,
      description: description,
      url: `${configs.AppDetails.appUrl}/p/${data.id}`,
      siteName: 'SkyLight',
      locale: "en-US",
      type: 'website',
      images: [
        {
          type: "image/png",
          width: 800,
          height: 600,
          url: data.fileUrl[0]
        },
        {
          type: "image/png",
          width: 200,
          height: 200,
          url: data.fileUrl[0]
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      site: '@SkyLightApp',
      creator: `@${data.user.username}`,
      images: [data.fileUrl[0]],
    },
    category: `${configs.AppDetails.category}`,
    robots: metaRobots
  }
}

export default function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  )
}
