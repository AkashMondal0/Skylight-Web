import { Suspense } from "react";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import { RestApiPayload, User } from '@/types';
import ModalFollowing from "@/components/profile/following/c";

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
        return <ModalFollowing data={data} profileId={params.profile} />
    } catch (error) {
        console.log(error)
        return notFound()
    }
}

export default async function Page({ params }: { params: { profile: string } }) {
    return <>
        <Suspense fallback={<></>}>
            <PageComponent params={params} />
        </Suspense>
    </>
}
