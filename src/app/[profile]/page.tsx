'use client'
import {useEffect, useMemo} from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfileDetailApi } from "@/redux/services/profile";
import PostGridListVirtualList from "@/components/PostFeed/PostGridListVirtualList";
import { useSession } from "next-auth/react";
let profileUsername = "no_username"

export default function Page({ params }: { params: { profile: string } }) {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const isProfile = useMemo(() => session?.username === params?.profile, [session?.username, params?.profile])

    useEffect(() => {
        if (profileUsername !== params.profile) {
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
        }
        profileUsername = params.profile
    }, [params.profile])

    return <PostGridListVirtualList scrollToTop={profileUsername !== params.profile} isProfile={isProfile}/>

}
