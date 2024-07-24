import useWindowDimensions from "@/lib/useWindowDimensions";
import { FeedPost } from "@/types";
import { useVirtualizer, } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import OptimizedImage from "../sky/SkyImage";
import { PageState_Context } from "@/provider/PageState_Provider";
import { Button } from "../ui/button";
import { CirclePlus } from "../sky/icons";

const VirtualizedList = ({
    Header,
    Footer,
    ProfileDetail,
    Navigation,
    data: profilePosts,
    pageStateContext
}: {
    data: FeedPost[],
    Header?: React.ReactNode
    Footer?: React.ReactNode
    ProfileDetail: React.ReactNode,
    Navigation?: React.ReactNode,
    pageStateContext: PageState_Context
}) => {
    const parentRef = useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => profilePosts, [profilePosts])
    const count = useMemo(() => Math.ceil(data.length / 3), [data.length])
    const previousScrollCount = pageStateContext?.pageScrollOffsetRef.current?.profile
    const disableRef = useRef(false)

    const onChange = useCallback(() => {
        pageStateContext.profileScrollOffset(virtualizer.scrollOffset ?? 0);
        if (!disableRef.current && (previousScrollCount ?? 0) > 0) {
            virtualizer.scrollToOffset(previousScrollCount ?? 0)
            disableRef.current = true
        }
    }, [])

    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 50, []),
        overscan: 24,
        enabled: true,
        onChange
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const items = virtualizer.getVirtualItems()

    if (!mounted) return <></>

    const RenderImg = ({ post }: { post: FeedPost }) => {
        if (!post) return <div className="h-full aspect-square w-full" />
        return <OptimizedImage
            fetchPriority="high"
            src={post.fileUrl[0]}
            width={100} height={100}
            className="h-full aspect-square w-full object-cover"
            sizes="(min-width: 808px) 20vw, 40vw" />
    }

    return (
        <>
            <div ref={parentRef}
                style={{
                    height: dimension.height ?? "100%",
                    width: '100%',
                    overflowY: 'auto',
                    contain: 'strict',
                }}>
                {Header}
                {ProfileDetail}
                <div
                    className='mx-auto max-w-[960px]'
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
                                ref={virtualizer.measureElement}
                                className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
                                <div className="p-[1px] w-full flex h-full space-x-[2px]"
                                    style={{ aspectRatio: "3:1" }}
                                    key={data[virtualRow.index].id}>
                                    {/* {virtualRow.index * 3 + 1}
                                    {virtualRow.index * 3 + 2}
                                    {virtualRow.index * 3 + 3} */}
                                    <RenderImg post={data[virtualRow.index * 3 + 0] ?? null} />
                                    <RenderImg post={data[virtualRow.index * 3 + 1] ?? null} />
                                    <RenderImg post={data[virtualRow.index * 3 + 2] ?? null} />
                                </div>
                            </div>
                        ))}        
                    </div>
                </div>
                {Footer}
                {Navigation}
            </div>
        </>
    )
}

export default VirtualizedList