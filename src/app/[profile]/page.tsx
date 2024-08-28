'use client'
import { useVirtualizer, } from "@tanstack/react-virtual";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavigationBottom } from "@/components/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchUserProfilePostsApi, fetchUserProfileDetailApi } from "@/redux/services/profile";
import { ProfileHero, ProfileHeroSkeleton, ProfileNavbar, ProfilePost } from "@/components/Profile";
import { useSession } from "next-auth/react";
import NotFound from "@/components/Error/NotFound";
import { debounce } from "lodash";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthorData, Post, disPatchResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/sky/icons";

let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;

let profileUsername = "no_username"
let totalFetchedItemCount: number | null = 0

export default function Page({ params }: { params: { profile: string } }) {
    const [mounted, setMounted] = useState(false)
    const dispatch = useDispatch()
    const session = useSession().data?.user
    //
    const userData = useSelector((Root: RootState) => Root.profile.state, (prev, next) => prev?.id === next?.id)
    const loading = useSelector((Root: RootState) => Root.profile.loading)
    const error = useSelector((Root: RootState) => Root.profile.error)
    //
    const posts = useSelector((Root: RootState) => Root.profile.posts)
    const postsLoading = useSelector((Root: RootState) => Root.profile.postLoading)
    //
    const count = useMemo(() => Math.ceil(posts.length / 3), [posts.length])
    const isProfile = useMemo(() => session?.username === params?.profile, [session?.username, params?.profile])
    //
    const stopRef = useRef(false)
    const parentRef = useRef<HTMLDivElement>(null)
    // 

    const fetchProfilePosts = useCallback(async (id?: string) => {
        // console.log("fetching", stopRef.current, !id, totalFetchedItemCount === null)
        if (stopRef.current || !id || totalFetchedItemCount === null) return
        try {
            stopRef.current = true
            const res2 = await dispatch(fetchUserProfilePostsApi({
                username: id,
                limit: 12,
                offset: totalFetchedItemCount
            }) as any) as disPatchResponse<Post[]>
            if (res2.payload.length > 0) {
                // if less than 12 items fetched, stop fetching
                if (res2.payload.length < 12) {
                    return totalFetchedItemCount = null
                }
                // if more than 12 items fetched, continue fetching
                totalFetchedItemCount += 12
            }
        } finally {
            stopRef.current = false
        }
    }, [])

    const fetchProfileData = useCallback(async () => {
        try {
            const res = await dispatch(fetchUserProfileDetailApi(params.profile) as any) as disPatchResponse<AuthorData>
            if (res.error || !res.payload.id) return toast.error("Something went wrong")
            fetchProfilePosts(res.payload.id)
        } finally {

        }
    }, [fetchProfilePosts, params.profile])

    const fetchMorePost = debounce(() => fetchProfilePosts(userData?.id), 1000)

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
            if (virtualizer.scrollDirection === 'forward'
                && virtualizer?.range?.startIndex === count - 2
                && !stopRef.current
                && totalFetchedItemCount !== null) {
                fetchMorePost()
            }
        },
    })

    useEffect(() => {
        if (profileUsername !== params.profile) {
            totalFetchedItemCount = 0
            _kSavedOffset = 0;
            _KMeasurementsCache = []
            profileUsername = params.profile
            fetchProfileData()
            // reset the state
        }
        if (!mounted) {
            setMounted(true)
        }
    }, [params.profile])

    const items = virtualizer.getVirtualItems()

    if(!mounted) return <></>

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
                    <ProfileNavbar name={loading ? "Loading" : userData?.username} isProfile={isProfile} />
                    {loading ? <ProfileHeroSkeleton /> : <ProfileHero profileUser={userData} isProfile={isProfile} />}
                </>
                {error ?
                    <NotFound message={error ?? "PAGE_NOT_FOUND"} /> :
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
                                        style={{ aspectRatio: "3:1" }} key={posts[virtualRow.index].id}>
                                        <ProfilePost data={posts[virtualRow.index * 3 + 0] ?? null} />
                                        <ProfilePost data={posts[virtualRow.index * 3 + 1] ?? null} />
                                        <ProfilePost data={posts[virtualRow.index * 3 + 2] ?? null} />
                                    </div>
                                </div>))}
                            </div>
                        </div>
                        <div>
                            <div className="w-10 h-16 mx-auto z-50">
                                {postsLoading || loading ?
                                    <Loader2 className="animate-spin w-10 h-10 text-accent" /> :
                                    userData?.postCount === posts.length ? <></> :
                                        <Button className="w-10 h-10 p-0 rounded-full" variant={"secondary"}
                                            onClick={() => { fetchProfilePosts(userData?.id) }}>
                                            <CirclePlus />
                                        </Button>}
                            </div>
                        </div>
                    </div>}
            </div>
            <NavigationBottom />
        </div>
    )
}