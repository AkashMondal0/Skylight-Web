'use client'
import { getRandomPost, getRandomProfilePost } from "@/components/sky/random"
import { fetchAccountFeedApi } from "@/redux/services/account"
import { fetchConversationsApi } from "@/redux/services/conversation"
import { fetchUserProfileDetailApi, fetchUserProfilePostsApi } from "@/redux/services/profile"
import { setMoreData } from "@/redux/slice/post"
import { setLoadMoreProfilePosts } from "@/redux/slice/profile"
import { debounce } from "lodash"
import React, { createContext, useCallback, useState } from "react"
import { useDispatch } from "react-redux"

interface PageState_Context {
    fetchHomPageInitial: () => void
    fetchHomePageMore: () => void
    fetchProfilePageInitial: (profileId: string) => void
    fetchProfilePageMore: () => void
    loaded: {
        home: boolean,
        profile: boolean,
        message: boolean,
        inbox: boolean
    },
    fetchMessagePageInitial: () => void,
    fetchInboxPageInitial: (id: string) => void
}
export const PageStateContext = createContext<PageState_Context>({
    fetchHomPageInitial: () => { },
    fetchHomePageMore: () => { },
    fetchProfilePageInitial: () => { },
    fetchProfilePageMore: () => { },
    loaded: {
        home: false,
        profile: false,
        message: false,
        inbox: false
    },
    fetchMessagePageInitial: () => { },
    fetchInboxPageInitial: () => { }
})

export default function PageState_Provider({
    children
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState<PageState_Context["loaded"]>({
        home: false,
        profile: false,
        message: false,
        inbox: false
    })
    const fetchHomPageInitial = useCallback(async () => {
        dispatch(fetchAccountFeedApi() as any)
        setLoaded((pre) => ({ ...pre, home: true }))
    }, [])

    const fetchHomePageMore = debounce(() => {
        const _posts = getRandomPost(10)
        dispatch(setMoreData(_posts) as any)
    }, 500)

    const fetchProfilePageInitial = useCallback(async (profileId: string) => {
        dispatch(fetchUserProfileDetailApi(profileId) as any)
        dispatch(fetchUserProfilePostsApi({
            username: profileId,
            limit: 12,
            offset: 0
        }) as any)
        setLoaded((pre) => ({ ...pre, profile: true }))
    }, [])

    const fetchProfilePageMore = async () => {
        const _posts = getRandomProfilePost(10)
        dispatch(setLoadMoreProfilePosts(_posts))
    }

    const fetchMessagePageInitial = async () => {
        dispatch(fetchConversationsApi() as any)
        setLoaded((pre) => ({ ...pre, message: true }))
    }

    const fetchInboxPageInitial = debounce(async () => {
        dispatch(fetchConversationsApi() as any)
        setLoaded((pre) => ({ ...pre, inbox: true }))
    },100)

    return (<PageStateContext.Provider value={{
        fetchHomPageInitial,
        fetchHomePageMore,
        fetchProfilePageInitial,
        fetchProfilePageMore,
        loaded,
        fetchMessagePageInitial,
        fetchInboxPageInitial
    }}>
        {children}
    </PageStateContext.Provider>)
}