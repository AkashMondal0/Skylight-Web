'use client'
import Sm_Navigation from "@/components/home/navigation/sm-navigation";
import ProfileHeader from "@/components/profile/client/header";
import VirtualizedList from '@/components/profile/VirtualizedList';
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import {
    useCallback,
    useEffect,
    useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "@/components/profile/client/hero";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/sky/icons";
import { fetchUserProfileDetailApi, fetchUserProfilePostsApi } from "@/redux/services/profile";
import { getRandomProfilePost } from "@/components/sky/random";
import { setLoadMoreProfilePosts } from "@/redux/slice/profile";
import NotFound from "@/components/home/NotFound";
import { SkeletonProfilePage } from "@/components/profile/loading.page";
const _posts = getRandomProfilePost(10)
let profileUsername = "no_username"
let loaded = false

export default function Page({ params }: { params: { profile: string } }) {
    const session = useSession().data?.user
    const profile = useSelector((Root: RootState) => Root.profile)
    const isProfile = useMemo(() => session?.username === params.profile, [session?.username])
    const dispatch = useDispatch()
    useEffect(() => {
        if (profileUsername !== params.profile) {
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
            dispatch(fetchUserProfilePostsApi({
                username: params.profile,
                limit: 12,
                offset: 0
            }) as any)
        }
        profileUsername = params.profile
        loaded = true
    }, [params.profile])

    const loadMorePosts = useCallback(() => {
        dispatch(setLoadMoreProfilePosts(_posts))
    }, [])

    if (profile.loading || !loaded) {
        return <SkeletonProfilePage />
    }

    if (profile.error || !profile.state) {
        return <NotFound />
    }

    if (profile.state) {
        return (
            <div className="w-full">
                <VirtualizedList data={profile.posts}
                    Header={<ProfileHeader name={params.profile} />}
                    ProfileDetail={<HeroSection
                        isProfile={isProfile}
                        user={profile.state} />}
                    Footer={
                        <div className='w-full text-center my-4 h-[60%]'>
                            <Button onClick={loadMorePosts}
                                variant={"outline"}
                                className="rounded-full px-1 w-10 h-10">
                                <CirclePlus />
                            </Button>
                        </div>}
                    Navigation={<Sm_Navigation />}
                />
            </div>
        )
    }
}
