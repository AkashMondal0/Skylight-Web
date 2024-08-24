'use client'
import useWindowDimensions from "@/lib/useWindowDimensions";
import { useVirtualizer, } from "@tanstack/react-virtual";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavigationBottom } from "@/components/Navigation/NavigationBottom";
import { ProfilePost } from "@/components/Profile/ProfilePost";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchMoreUserProfilePostsApi, fetchUserProfileDetailApi } from "@/redux/services/profile";
import { useSession } from "next-auth/react";
import NotFound from "@/components/Error/NotFound";
import { ProfileHero, ProfileHeroSkeleton, ProfileNavbar } from "@/components/Profile";
import { debounce } from "lodash";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/sky/icons";
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;
let profileUsername = "no_username"
let pageLoaded = false
let totalFetchedItemCount = 12

export default function Page({ params }: { params: { profile: string } }) {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const loadMore = useRef(false)

    const isProfile = useMemo(() => session?.username === params?.profile,
        [session?.username, params?.profile])

    useEffect(() => {
        if (profileUsername !== params.profile || !pageLoaded) {
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
            // reset the state
            totalFetchedItemCount = 12
            _kSavedOffset = 0;
            _KMeasurementsCache = []
        }
        profileUsername = params.profile
        pageLoaded = true
    }, [params.profile])

    const fetchMore = debounce(async (user: User | null) => {
        if (loadMore.current) return
        if (!user) return toast.error("Failed to fetch more posts, please try again")
        if (totalFetchedItemCount >= user.postCount) return
        try {
            loadMore.current = true
            await dispatch(fetchMoreUserProfilePostsApi({
                username: user.id,
                limit: 12,
                offset: totalFetchedItemCount
            }) as any)
            totalFetchedItemCount += 12
        } catch (error) {
            toast.error("Failed to fetch more posts, please try again")
        } finally {
            loadMore.current = false
        }
    }, 1000)

    return <PostGridListVirtualList
        loadMore={loadMore.current}
        fetchMore={fetchMore}
        scrollToTop={profileUsername !== params.profile}
        isProfile={isProfile}
    />
}

const PostGridListVirtualList = memo(function PostGridListVirtualList({
    scrollToTop,
    isProfile,
    fetchMore,
    loadMore,
}: {
    scrollToTop: boolean,
    isProfile: boolean,
    fetchMore: (user: User | null) => void
    loadMore: boolean
}) {
    const profileUser = useSelector((Root: RootState) => Root.profile)
    const parentRef = useRef<HTMLDivElement>(null)
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
            if (virtualizer.range?.startIndex && virtualizer.scrollDirection === 'forward') {
                if (profileUser.state?.postCount === data.length) return
                const start = virtualizer.range.startIndex
                if (start === count - 2 && !loadMore) {
                    fetchMore(profileUser.state)
                }
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
        <div className="flex flex-col w-full h-dvh">
            <div ref={parentRef}
                style={{
                    height: "100%",
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
                        <ProfileHeroSkeleton /> :
                        <ProfileHero profileUser={profileUser.state} isProfile={isProfile} />}
                </>
                {pageLoaded && profileUser.error ?
                    <NotFound message={profileUser?.error ?? "PAGE_NOT_FOUND"} /> :
                    !pageLoaded || profileUser.postLoading || profileUser.loading ?
                        <div className="mx-auto max-w-[960px] h-full">
                            <Loader2 className="animate-spin w-10 h-10 mx-auto my-10 text-accent" />
                        </div> :
                        <div>
                            <div
                                className='mx-auto max-w-[960px] h-full'
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
                                    {items.map((virtualRow) => (<div
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
                            <div className="w-10 h-16 mx-auto flex items-end">
                                {pageLoaded && profileUser.morePostsLoading ?
                                    <Loader2 className="animate-spin w-10 h-10 text-accent" /> :
                                    profileUser.state?.postCount === data.length ? <></> :
                                        <Button className="w-10 h-10 p-0 rounded-full" variant={"secondary"}
                                            onClick={() => { fetchMore(profileUser.state) }}>
                                            <CirclePlus />
                                        </Button>}
                            </div>
                        </div>}
            </div>
            <NavigationBottom />
        </div>
    )
}, ((pre: any, next: any) => {
    return pre?.scrollToTop === next?.scrollToTop
        && pre?.isProfile === next?.isProfile
        && pre?.loadMore === next?.loadMore
}))