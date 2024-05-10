import { Suspense } from "react";
import SkeletonProfile from "@/components/profile/loading/skeleton";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import { User } from '@/types';
import ModalFollowing from "@/components/profile/follower/c";

async function getProfile(id: string) {
    try {
        const response = await fetch(`${configs.appUrl}/api/v1/profile/${id}/follower`, {
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
async function PageComponent({ params }: { params: { profile: string } }) {
    try {
        const data = await getProfile(params.profile) as User[]
        console.log(data)
        // return <ModalFollowing data={data} />
        return <></>
    } catch (error) {
        console.log(error)
        return notFound()
    }
}

export default async function Page({ params }: { params: { profile: string } }) {
    return <div className="w-full h-full">
        <Suspense fallback={<SkeletonProfile />}>
            <PageComponent params={params} />
        </Suspense>
    </div>
}
