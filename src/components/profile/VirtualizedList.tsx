import useWindowDimensions from "@/lib/useWindowDimensions";
import { FeedPost } from "@/types";
import { useVirtualizer, } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef, useState } from "react";
import { getRandomPost } from "../sky/random";
import { ImageComponent } from "./client/Post";
import OptimizedImage from "../sky/SkyImage";

const posts = getRandomPost(3)
const VirtualizedList = ({ data, Header, Footer }: {
    data: FeedPost[],
    Header?: React.ReactNode
    Footer?: React.ReactNode
}) => {
    const parentRef = useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    // const data = useMemo(() => posts.state, [posts.state])
    const count = useMemo(() => data.length, [data.length])


    const virtualizer = useVirtualizer({
        count: Math.ceil(10 / 3),
        getScrollElement: () => parentRef.current,
        estimateSize: () => 45,
        overscan: 9,
        enabled: true,
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const items = virtualizer.getVirtualItems()

    if (!dimension.isMounted || !mounted) return <>dimension.isMounted</>

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
                <div
                    className='mx-auto max-w-[960px]'
                    style={{
                        height: virtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
                    }}>
                    <div
                        // className="grid grid-cols-3 gap-[1px]"
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
                                    // key={posts[virtualRow.index].id}
                                    >
                                    {/* <ImageComponent data={profile.posts[index]}/> */}
                                    {/* <img src={posts[virtualRow.index].fileUrl[0]} width={100} height={100} className="w-full h-full" /> */}

                                    <OptimizedImage
                                        fetchPriority="high"
                                        src={'/user.jpg'}
                                        width={100} height={100}
                                        className="h-full aspect-square w-full"
                                        sizes="(min-width: 808px) 20vw, 40vw" />
                                    <OptimizedImage
                                        fetchPriority="high"
                                        src={'/user.jpg'}
                                        width={100} height={100}
                                        className="h-full aspect-square w-full"
                                        sizes="(min-width: 808px) 20vw, 40vw" />
                                    <OptimizedImage
                                        fetchPriority="high"
                                        src={'/user.jpg'}
                                        width={100} height={100}
                                        className="h-full aspect-square w-full"
                                        sizes="(min-width: 808px) 20vw, 40vw" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {Footer}
            </div>
        </>
    )
}

export default VirtualizedList