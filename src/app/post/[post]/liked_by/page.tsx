import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import { Suspense } from 'react';
import PostLikedPage from './c';
import { SkeletonLikedPage } from '@/components/home/loading/LikedPage';

async function getData(id: string) {
  try {
    const response = await fetch(`${configs.appUrl}/api/v1/post/${id}/like/get`, {
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
async function PageComponent({ params }: { params: { post: string } }) {
  try {
    const data = await getData(params?.post)
    return <PostLikedPage postId={params?.post} data={data} />
  } catch (error) {
    console.log(error)
    return notFound()
  }
}

export default async function Page({ params }: { params: { post: string } }) {

  return <Suspense fallback={<SkeletonLikedPage/>}>
    <PageComponent params={params} />
  </Suspense>

}
