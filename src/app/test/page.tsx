import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import TestV from './component';

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

export default async function FeedsPage() {
    try {
        const data = await getFeeds()
        return (
            <div className='w-full'>
                {/* {data?.map((feed:any, i:number) => <PostItem key={i} feed={feed as any} />)} */}
                <TestV data={data} />
            </div>
        )
    } catch (error) {
        console.log(error)
        return notFound()
    }
}