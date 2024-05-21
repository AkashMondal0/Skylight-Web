import { configs } from "@/configs";
import { FeedPost } from "@/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import PostPage from "./c";

async function getFeed(id: string) {
  try {
    const response = await fetch(`${configs.appUrl}/api/v1/feed/${id}`, {
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

export default async function Page({ params }: { params: { post: string } }) {

  const data = await getFeed(params.post) as FeedPost
  return <PostPage data={data} />
}