import { Suspense } from "react";
import SkeletonProfile from "@/components/profile/loading/skeleton";
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { configs } from '@/configs';
import MainLayout from '@/components/profile/MainLayout';
import { User } from '@/types';
import Sm_Navigation from "@/components/home/navigation/sm-navigation";
import ProfileHeader from "@/components/profile/client/header";

async function getProfile(id: string) {
    try {
        const response = await fetch(`${configs.appUrl}/api/v1/profile/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `${cookies().get("token-auth")?.value}`
            },
            cache: "no-store"
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return data.data;
    } catch (error) {
        console.log(error)
        return notFound()
    }
}
async function PageComponent({ params }: { params: { profile: string } }) {
    try {
        const data = await getProfile(params.profile) as User
        return <MainLayout data={data} />

    } catch (error) {
        console.log(error)
        return notFound()
    }
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
