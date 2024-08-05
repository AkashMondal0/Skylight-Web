import useWindowDimensions from "@/lib/useWindowDimensions";
import { Post } from "@/types";
import { useVirtualizer, } from "@tanstack/react-virtual";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProfileHeader } from "@/components/Header/ProfileHeader";
import { NavigationBottom } from "@/components/Navigation/NavigationBottom";
import { ProfilePost } from "@/components/PostFeed/ProfilePost";
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;


const PostGridListVirtualList = memo(function PostGridListVirtualList({
    profilePosts,
    scrollToTop
}: {
    profilePosts: Post[],
    scrollToTop: boolean
}) {
    const parentRef = useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => profilePosts?.length ? profilePosts : [], [profilePosts])
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
                <ProfileHeader />
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
                            transform: `translateY(${items[0]?.start ?? 0}px)`,
                        }}>
                        {items.map((virtualRow) => (
                            <div
                                key={virtualRow.key}
                                data-index={virtualRow.index}
                                ref={virtualizer.measureElement}>
                                <div className="p-[1px] w-full flex h-full space-x-[2px]"
                                    style={{ aspectRatio: "3:1" }}
                                    key={data[virtualRow.index].id}>
                                    {/* {virtualRow.index * 3 + 1}
                                    {virtualRow.index * 3 + 2}
                                    {virtualRow.index * 3 + 3} */}
                                    <ProfilePost data={data[virtualRow.index * 3 + 0] ?? null} />
                                    <ProfilePost data={data[virtualRow.index * 3 + 1] ?? null} />
                                    <ProfilePost data={data[virtualRow.index * 3 + 2] ?? null} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <NavigationBottom />
            </div>
        </>
    )
}, ((pre: any, next: any) => {
    return pre?.scrollToTop === next?.scrollToTop && pre?.profilePosts?.length === next?.profilePosts?.length
}))

export default PostGridListVirtualList