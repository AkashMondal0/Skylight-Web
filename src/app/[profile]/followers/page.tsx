import { Suspense } from "react";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import { User } from '@/types';
import PageFollower from "./c";
import { SkeletonUserCardFollowPage } from "@/components/profile/loading/skeleton";
import Sm_Navigation from "@/components/home/navigation/sm-navigation";

async function getProfileFollower(id: string) {
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
        const data = await getProfileFollower(params.profile) as User[]
        return <PageFollower data={data} profileId={params.profile}/>
    } catch (error) {
        console.log(error)
        return notFound()
    }
}

export default async function Page({ params }: { params: { profile: string } }) {
    return <>
        <Suspense fallback={<SkeletonUserCardFollowPage title="Followers"/>}>
            <PageComponent params={params} />
        </Suspense>
        <Sm_Navigation/>
    </>
}
