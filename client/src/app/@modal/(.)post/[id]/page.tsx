import PostFeedModal from "@/components/home/dialog/PostFeedModal"
import { configs } from "@/configs";
import { FeedPost } from "@/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

async function getFeed(id: string) {
  try {
    const response = await fetch(`${configs.appUrl}/api/feeds/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `${cookies().get("token-auth")?.value}`
      },
      cache: "no-store"
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error)
    return notFound()
  }
}

export default async function Page({ params }: { params: { id: string } }) {

  const data = await getFeed(params.id) as FeedPost
  
  return <PostFeedModal data={data} />
}