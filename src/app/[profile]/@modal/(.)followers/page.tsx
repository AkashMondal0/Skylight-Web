import { Suspense } from "react";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import { RestApiPayload, User } from '@/types';
import ModalFollower from "@/components/profile/follower/c";


async function getProfileFollower(id: string) {
    try {
        const response = await fetch(`${configs.appUrl}/api/v1/profile/${id}/follower`, {
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
        const data = await getProfileFollower(params.profile) as User[]
        return <ModalFollower data={data} profileId={params.profile} />
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
