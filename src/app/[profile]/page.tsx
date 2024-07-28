'use client'
import { RootState } from "@/redux/store";
import {
    useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileDetailApi} from "@/redux/services/profile";
// import { getRandomProfilePost } from "@/components/sky/random";
import dynamic from "next/dynamic";

const DynamicPostGridListVirtualList = dynamic(() => import('@/components/PostFeed/PostGridListVirtualList'), {
    loading: () => <>loading page</>
})

// const _posts = getRandomProfilePost(10)
let profileUsername = "no_username"
let loaded = false

export default function Page({ params }: { params: { profile: string } }) {
    const profilePosts = useSelector((Root: RootState) => Root.profile.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        if (profileUsername !== params.profile) {
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
            // dispatch(fetchUserProfilePostsApi({
            //     username: params.profile,
            //     limit: 12,
            //     offset: 0
            // }) as any)
            // dispatch(setLoadMoreProfilePosts(_posts))
        }
        profileUsername = params.profile
        loaded = true
    }, [params.profile])

    // const loadMorePosts = useCallback(() => {
    //     dispatch(setLoadMoreProfilePosts(_posts))
    // }, [])

    return <DynamicPostGridListVirtualList profilePosts={profilePosts} />

}
