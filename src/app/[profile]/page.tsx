'use client'
import { useVirtualizer, } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavigationBottom } from "@/components/Navigation";
import { useDispatch } from "react-redux";
import { ProfileHero, ProfileHeroSkeleton, ProfileNavbar, ProfilePost } from "@/components/Profile";
import { useSession } from "next-auth/react";
import NotFound from "@/components/Error/NotFound";
import { debounce } from "lodash";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Post, User, disPatchResponse, loadingType } from "@/types";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/sky/icons";
import { fetchUserProfileDetailApi, fetchUserProfilePostsApi } from "@/redux-stores/slice/profile/api.service";

let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any; // as VirtualItem[]

export default function Page({ params }: { params: { profile: string } }) {
    const [mounted, setMounted] = useState(false)
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const [loading, setLoading] = useState<loadingType>('idle')
    const [error, setError] = useState<string | null>(null)
    const Posts = useRef<Post[]>([])
    const UserData = useRef<User | null>(null)
    const username = params?.profile
    const postsFetched = useRef(false)
    const count = useMemo(() => Math.ceil(Posts.current.length / 3), [Posts.current.length])
    const isProfile = useMemo(() => session?.username === params?.profile, [session?.username, params?.profile])
    //
    const stopRef = useRef(false)
    const parentRef = useRef<HTMLDivElement>(null)
    //

    const fetchPosts = useCallback(async () => {
        if (loading === "pending") return
        setLoading("pending")
        try {
            const res = await dispatch(fetchUserProfilePostsApi({
                username: UserData.current?.id,
                offset: Posts.current.length,
                limit: 12
            }) as any) as disPatchResponse<Post[]>
            if (res.error) {
                toast.error(res?.error?.message || "An error occurred")
                setError(res?.error?.message || "An error occurred")
                return
            }
            if (res.payload.length <= 0) {
                postsFetched.current = true
                return
            }
            Posts.current.push(...res.payload)
        } finally {
            setLoading("normal")
        }
    }, [loading, UserData.current, Posts.current])


    const fetchUserData = useCallback(async () => {
        if (UserData.current) return
        const res = await dispatch(fetchUserProfileDetailApi(username) as any) as disPatchResponse<User>
        if (res.error) {
            setError(res?.error?.message || "An error occurred")
            setLoading("normal")
            return
        }
        UserData.current = res.payload
        fetchPosts()
    }, [username])

    const fetchMorePost = debounce(() => fetchPosts(), 1000)

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
                && !postsFetched.current) {
                fetchMorePost()
            }
        },
    })

    useEffect(() => {
        if (!mounted) {
            postsFetched.current = false
            _kSavedOffset = 0;
            _KMeasurementsCache = []
            fetchUserData()
            setMounted(true)
        }
    }, [params.profile])

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
                    <ProfileNavbar name={loading === "normal" ? UserData.current?.username : "Loading"} isProfile={isProfile} />
                    {loading === "idle" ? <ProfileHeroSkeleton /> : <ProfileHero profileUser={UserData.current} isProfile={isProfile} />}
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
                                        style={{ aspectRatio: "3:1" }} key={Posts.current[virtualRow.index].id}>
                                        <ProfilePost data={Posts.current[virtualRow.index * 3 + 0] ?? null} />
                                        <ProfilePost data={Posts.current[virtualRow.index * 3 + 1] ?? null} />
                                        <ProfilePost data={Posts.current[virtualRow.index * 3 + 2] ?? null} />
                                    </div>
                                </div>))}
                            </div>
                        </div>
                        <div>
                            <div className="w-10 h-16 mx-auto z-50">
                                {loading === "normal" ?
                                    UserData.current?.postCount === Posts.current.length ? <></> :
                                        <Button className="w-10 h-10 p-0 rounded-full" variant={"secondary"}
                                            onClick={fetchUserData}>
                                            <CirclePlus />
                                        </Button> :
                                    <Loader2 className="animate-spin w-10 h-10 text-accent" />}
                            </div>
                        </div>
                    </div>}
            </div>
            <NavigationBottom />
        </div>
    )
}