import { configs } from "@/configs";
import { AuthorData } from "@/types";
import { DefaultMetadata } from "@/types/Metadata";
import { Metadata } from "next";

interface PostData {
  id: string,
  content: string,
  fileUrl: string[],
  likeCount: number,
  commentCount: number,
  user: AuthorData
}
export async function generateMetadata({ params: { post } }: { params: { post: string } }): Promise<Metadata> {
  const res = await fetch(`${configs.serverApi.baseUrl}/v1/post/${post}`)

  if (!res.ok) return DefaultMetadata
  const data = await res.json() as PostData

  if (!data) return DefaultMetadata
  if (!data?.user?.name) return DefaultMetadata

  return {
    title: `${data.user.name} on Skylight: ${data.content}`,
    description: `${data.user.name} on Skylight: ${data.content}`,
    openGraph: {
      title: `${data.user.name} on Skylight: ${data.content}`,
      description: `${data.user.name} on Skylight: ${data.content}`,
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
    }
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
