'use client'
import Sm_Navigation from "@/components/home/navigation/sm-navigation";
import ProfileHeader from "@/components/profile/client/header";
import VirtualizedList from '@/components/profile/VirtualizedList';
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import {
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useSelector } from "react-redux";
import HeroSection from "@/components/profile/client/hero";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/sky/icons";
import { PageStateContext } from "@/provider/PageState_Provider";


export default function Page({ params }: { params: { profile: string } }) {
    const session = useSession().data?.user
    const profile = useSelector((Root: RootState) => Root.profile)
    const isProfile = useMemo(() => session?.username === params.profile, [session?.username])
    const pageStateContext = useContext(PageStateContext)

    useEffect(() => {
        if (!pageStateContext.loaded.profile || profile.state?.username !== params.profile) {
            pageStateContext.fetchProfilePageInitial(params.profile)
        }
    }, [params.profile])

    return (
        <div className="w-full">
            <VirtualizedList data={profile.posts}
                pageStateContext={pageStateContext}
                Header={<ProfileHeader name={params.profile} />}
                ProfileDetail={<HeroSection
                    isProfile={isProfile}
                    user={profile.state} />}
                Footer={<div
                    className={`min-h-80`}
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Button onClick={pageStateContext.fetchProfilePageMore}
                        variant={"outline"}
                        className="rounded-full px-1">
                        <CirclePlus />
                    </Button>
                </div>}
                Navigation={<Sm_Navigation />}
            />
        </div>
    )
}
