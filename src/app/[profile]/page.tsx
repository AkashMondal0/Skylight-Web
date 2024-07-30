'use client'
import { RootState } from "@/redux/store";
import {
    useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileDetailApi} from "@/redux/services/profile";
import dynamic from "next/dynamic";

const DynamicPostGridListVirtualList = dynamic(() => import('@/components/PostFeed/PostGridListVirtualList'), {
    loading: () => <>loading page</>
})
let profileUsername = "no_username"
let loaded = false

export default function Page({ params }: { params: { profile: string } }) {
    const profilePosts = useSelector((Root: RootState) => Root.profile.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        if (profileUsername !== params.profile) {
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
        }
        profileUsername = params.profile
        loaded = true
    }, [params.profile])

    return <DynamicPostGridListVirtualList profilePosts={profilePosts} />

}
