import { Suspense } from "react";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import { User } from '@/types';
import ModalFollowing from "@/components/profile/following/c";
import PageFollowing from "./c";
import { SkeletonUserCardFollowPage } from "@/components/profile/loading/skeleton";

async function getProfileFollowing(id: string) {
    try {
        const response = await fetch(`${configs.appUrl}/api/v1/profile/${id}/following`, {
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
        const data = await getProfileFollowing(params.profile) as User[]
        return <PageFollowing data={data} />
    } catch (error) {
        console.log(error)
        return notFound()
    }
}

export default async function Page({ params }: { params: { profile: string } }) {
    return <>
        <Suspense fallback={<SkeletonUserCardFollowPage title="Following"/>}>
            <PageComponent params={params} />
        </Suspense>
    </>
}
