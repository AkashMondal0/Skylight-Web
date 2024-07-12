import MainLayout from '@/components/profile/MainLayout';
import Sm_Navigation from "@/components/home/navigation/sm-navigation";
import ProfileHeader from "@/components/profile/client/header";

export default async function Page({ params }: { params: { profile: string } }) {
    return (
        <div className="w-full">
            <ProfileHeader name={params.profile} />
            <MainLayout username={params.profile} />
            <Sm_Navigation />
        </div>
    )
}
