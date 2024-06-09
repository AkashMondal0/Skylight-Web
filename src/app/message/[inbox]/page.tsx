import MainClientPage from '@/components/message/inbox/main';
import { MessagePageSkeleton } from '@/components/message/loading';
import { configs } from '@/configs';
import { Conversation, RestApiPayload } from '@/types';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'


async function getConversationMessageApi(id: string) {
  try {
    const response = await fetch(`${configs.appUrl}/api/v1/inbox/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `${cookies().get("token-auth")?.value}`
      },
      cache: "no-store"
    });
    const res = await response.json() as RestApiPayload<Conversation>;
    if (res.code === 0) {
      throw new Error(res.message);
    }
    return res.data;
  } catch (error) {
    console.log(error)
    return notFound()
  }
}

const RenderComponent = async ({ params }: { params: { inbox: string } }) => {
  const data = await getConversationMessageApi(params.inbox);
  return <MainClientPage data={data}/>
}

export default async function Page({ params }: { params: { inbox: string } }) {
  return (
    <div className='w-full flex flex-col'>
      <Suspense fallback={<MessagePageSkeleton />}>
        <RenderComponent params={params} />
      </Suspense>
    </div>
  )
}
