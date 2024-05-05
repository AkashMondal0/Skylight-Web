import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import PostItem from './Card/PostCard';

async function getFeeds() {
  try {
  const response = await fetch("http://localhost:3000/api/feeds", {
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

export default async function FeedsPage() {
  try {
    const data = await getFeeds() as any;

    return (
      <div>
        {data?.map((feed, i) => <PostItem key={i} feed={feed as any} />)}
      </div>
    )
  } catch (error) {
    console.log(error)
    return notFound()
  }
}