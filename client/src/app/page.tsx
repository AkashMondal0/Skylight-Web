import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';;
import { FeedPost } from '@/types';
import VirtualizePost from '@/components/home/VirtualizePost';
import { Suspense } from 'react';
import SkeletonPostCard from '@/components/home/loading/PostCard';

async function getFeeds() {
  try {
    const response = await fetch(`${configs.appUrl}/api/feeds`, {
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


async function Render() {
  const data = await getFeeds() as FeedPost[];
  return <VirtualizePost data={data} />
}

export default async function Page() {
  try {
    return (
      <Suspense fallback={<SkeletonPostCard/>}>
        <Render />
      </Suspense>)
  } catch (error) {
    console.log(error)
    return notFound()
  }
}