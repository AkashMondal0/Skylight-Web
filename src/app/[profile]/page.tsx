'use client'
import useWindowDimensions from "@/lib/useWindowDimensions";
import { useVirtualizer, } from "@tanstack/react-virtual";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProfileHeader, ProfileNavbar } from "@/components/Header/ProfileHeader";
import { NavigationBottom } from "@/components/Navigation/NavigationBottom";
import { ProfilePost } from "@/components/PostFeed/ProfilePost";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchUserProfileDetailApi } from "@/redux/services/profile";
import { useSession } from "next-auth/react";
import { ProfileHeaderLoading, ProfilePostLoading } from "@/components/loading/Profile.page";
import NotFound from "@/components/Error/NotFound";
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;
let profileUsername = "no_username"
let pageLoaded = false

export default function Page({ params }: { params: { profile: string } }) {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const isProfile = useMemo(() => session?.username === params?.profile, [session?.username, params?.profile])

    useEffect(() => {
        if (profileUsername !== params.profile || !pageLoaded) {
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
        }
        pageLoaded = true
        profileUsername = params.profile
    }, [params.profile])

    return <PostGridListVirtualList
        scrollToTop={profileUsername !== params.profile}
        isProfile={isProfile} />
}

const PostGridListVirtualList = memo(function PostGridListVirtualList({
    scrollToTop,
    isProfile,
}: {
    scrollToTop: boolean,
    isProfile: boolean,
}) {
    const profileUser = useSelector((Root: RootState) => Root.profile)
    const parentRef = useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => profileUser?.posts.length ? profileUser.posts : [], [profileUser.posts.length])
    const count = useMemo(() => Math.ceil(data.length / 3), [data.length])

    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 50, []),
        overscan: 20,
        enabled: true,
        initialOffset: _kSavedOffset,
        initialMeasurementsCache: _KMeasurementsCache,
        onChange: (virtualizer) => {
            if (!virtualizer.isScrolling) {
                _KMeasurementsCache = virtualizer.measurementsCache;
                _kSavedOffset = virtualizer.scrollOffset || 0;
            }
        },
    })

    useEffect(() => {
        if (scrollToTop) {
            _kSavedOffset = 0;
            _KMeasurementsCache = []
        }
        setMounted(true)
    }, [])
    const items = virtualizer.getVirtualItems()

    if (!mounted) return <></>
    return (
        <>
            <div ref={parentRef}
                style={{
                    height: dimension.height ?? "100%",
                    width: '100%',
                    overflowY: 'auto',
                    contain: 'strict',
                }}>
                <>
                    <ProfileNavbar
                        name={!pageLoaded || profileUser.loading ? "Loading"
                            : profileUser?.state?.username}
                        isProfile={isProfile} />
                    {!pageLoaded || profileUser.loading ?
                        <ProfileHeaderLoading /> :
                        <ProfileHeader profileUser={profileUser.state} isProfile={isProfile} />}
                </>
                {pageLoaded && profileUser.error ?
                    <NotFound message={profileUser?.error ?? "PAGE_NOT_FOUND"} /> :
                    <div
                        className='mx-auto max-w-[960px] min-h-full'
                        style={{
                            height: virtualizer.getTotalSize(),
                            width: '100%',
                            position: 'relative'
                        }}>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                transform: `translateY(${items[0]?.start ?? 0}px)`
                            }}>
                            {!pageLoaded || profileUser.postLoading || profileUser.loading ? <ProfilePostLoading />
                                : items.map((virtualRow) => (<div
                                    key={virtualRow.key}
                                    data-index={virtualRow.index}
                                    ref={virtualizer.measureElement}>
                                    <div className="w-full flex h-full space-x-[2px] my-[2px] sm:space-x-[3px] sm:my-[3px]"
                                        style={{ aspectRatio: "3:1" }} key={data[virtualRow.index].id}>
                                        <ProfilePost data={data[virtualRow.index * 3 + 0] ?? null} />
                                        <ProfilePost data={data[virtualRow.index * 3 + 1] ?? null} />
                                        <ProfilePost data={data[virtualRow.index * 3 + 2] ?? null} />
                                    </div>
                                </div>))}
                        </div>
                    </div>
                }
                <NavigationBottom />
            </div>
        </>
    )
}, ((pre: any, next: any) => {
    return pre?.scrollToTop === next?.scrollToTop
        && pre?.isProfile === next?.isProfile
}))