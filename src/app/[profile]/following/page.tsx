import { Suspense } from "react";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import { RestApiPayload, User } from '@/types';
import PageFollowing from "./c";
import { SkeletonUserCardFollowPage } from "@/components/profile/loading/skeleton";
import Sm_Navigation from "@/components/home/navigation/sm-navigation";

async function getProfileFollowing(id: string) {
    try {
        const response = await fetch(`${configs.appUrl}/api/v1/profile/${id}/following`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `${cookies().get("token-auth")?.value}`
            },
            cache: "no-store"
        });
        const res = await response.json() as RestApiPayload<User[]>;
        if (res.code === 0) {
            throw new Error(res.message);
        }
        return res.data;
    } catch (error) {
        console.log(error)
        return notFound()
    }
}
async function PageComponent({ params }: { params: { profile: string } }) {
    try {
        const data = await getProfileFollowing(params.profile) as User[]
        return <PageFollowing data={data} profileId={params.profile}/>
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
        <Sm_Navigation/>
    </>
}
