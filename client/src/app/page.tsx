import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';;
import { FeedPost } from '@/types';
import VirtualizePost from '@/components/home/VirtualizePost';
import { Suspense } from 'react';
import SkeletonPostCard from '@/components/home/loading/PostCard';
import LikeViewModal from '@/components/home/dialog/LikeViewModal';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import Sm_Header from '@/components/home/navigation/sm-header';
import Lg_Navigation from '@/components/home/navigation/lg-navigation';

async function getFeeds() {
  try {
    const response = await fetch(`${configs.appUrl}/api/v1/feed`, {
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
      <>
        <LikeViewModal />
        <div className='w-full h-full flex'>
          <Lg_Navigation />
          <div className='w-full md:py-0 py-14'>
            <Sm_Header />
            <Suspense fallback={<SkeletonPostCard />}>
              <Render />
            </Suspense>
            <Sm_Navigation />
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.log(error)
    return notFound()
  }
}