import { Suspense } from "react";
import SkeletonProfile from "@/components/profile/loading/skeleton";
import MainLayout from '@/components/profile/MainLayout';
import Sm_Navigation from "@/components/home/navigation/sm-navigation";
import ProfileHeader from "@/components/profile/client/header";

export default async function Page({ params }: { params: { profile: string } }) {
    return (
        <div className="w-full">
            <ProfileHeader name={params.profile} />
            <Suspense fallback={<SkeletonProfile />}>
                <MainLayout username={params.profile}/>
            </Suspense>
            <Sm_Navigation />
        </div>
    )
}
