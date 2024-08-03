'use client'
import { RootState } from "@/redux/store";
import {
    useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileDetailApi } from "@/redux/services/profile";
import NotFound from "@/components/Error/NotFound";
import { SkeletonProfilePage } from "@/components/loading/Profile.page";
import { NavigationBottom } from "@/components/Navigation/NavigationBottom";
import PostGridListVirtualList from "@/components/PostFeed/PostGridListVirtualList";
let profileUsername = "no_username"
let loaded = false

export default function Page({ params }: { params: { profile: string } }) {
    const profilePosts = useSelector((Root: RootState) => Root.profile)
    const dispatch = useDispatch()
    useEffect(() => {
        if (profileUsername !== params.profile) {
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
        }
        profileUsername = params.profile
        loaded = true
    }, [params.profile])

    if (profilePosts.error && loaded) {
        return <NotFound message={profilePosts.error}/>
    }

    if (!loaded || profilePosts.loading) {
        return <div className="w-full">
            <SkeletonProfilePage />
            <NavigationBottom />
        </div>
    }

    return <PostGridListVirtualList
        profilePosts={profilePosts.posts} />

}
