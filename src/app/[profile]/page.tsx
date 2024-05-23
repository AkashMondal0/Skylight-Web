import { Suspense } from "react";
import SkeletonProfile from "@/components/profile/loading/skeleton";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import MainLayout from '@/components/profile/MainLayout';
import { RestApiPayload, User } from '@/types';
import Sm_Navigation from "@/components/home/navigation/sm-navigation";
import ProfileHeader from "@/components/profile/client/header";

async function getUserProfileApi(id: string) {
    try {
        const response = await fetch(`${configs.appUrl}/api/v1/profile/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `${cookies().get("token-auth")?.value}`
            },
            cache: "no-store"
        });
        const res = await response.json() as RestApiPayload<User>;
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
    const data = await getUserProfileApi(params.profile) as User
    return <MainLayout data={data} />
}

export default async function Page({ params }: { params: { profile: string } }) {
    return (
        <div className="w-full">
            <ProfileHeader name={params.profile} />
            <Suspense fallback={<SkeletonProfile />}>
                <PageComponent params={params} />
            </Suspense>
            <Sm_Navigation />
        </div>
    )
}
