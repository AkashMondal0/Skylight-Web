import useWindowDimensions from "@/lib/useWindowDimensions";
import { FeedPost } from "@/types";
import { useVirtualizer, } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef, useState } from "react";
import { getRandomPost } from "../sky/random";
import { ImageComponent } from "./client/Post";
import OptimizedImage from "../sky/SkyImage";

const _posts = getRandomPost(10)

const VirtualizedList = ({
    Header, Footer,
    ProfileDetail,
    Navigation
}: {
    data: FeedPost[],
    Header?: React.ReactNode
    Footer?: React.ReactNode
    ProfileDetail: React.ReactNode,
    Navigation?: React.ReactNode
}) => {
    const parentRef = useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => _posts, [])
    const count = useMemo(() => Math.ceil(data.length / 3), [data.length])


    const virtualizer = useVirtualizer({
        count,
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

    const RenderImg = ({ url }: { url: string }) => {
        if (!url) return <div className="h-full aspect-square w-full" />
        return <div className="h-full aspect-square w-full border">
            {/* <ImageComponent data={profile.posts[index]}/>  */}
            <OptimizedImage
                src={url}
                width={100}
                height={100}
                className="w-full h-full"
                showErrorIcon
                sizes="(min-width: 808px) 20vw, 40vw"
            />
        </div>
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
                                    key={data[virtualRow.index].id}
                                >
                                    {/* {virtualRow.index * 3 + 1}
                                    {virtualRow.index * 3 + 2}
                                    {virtualRow.index * 3 + 3} */}
                                    <RenderImg url={data[virtualRow.index * 3 + 0]?.fileUrl[0] ?? null} />
                                    <RenderImg url={data[virtualRow.index * 3 + 1]?.fileUrl[0] ?? null} />
                                    <RenderImg url={data[virtualRow.index * 3 + 3]?.fileUrl[0] ?? null} />

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