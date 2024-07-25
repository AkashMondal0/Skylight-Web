import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PostItem from './Card/PostCard';
import StoriesPage from './StoriesPage';
import ShowUpload from './alert/show-upload';
import { PostState } from '@/redux/slice/post';
import { Button } from '../ui/button';
import { CirclePlus } from '../sky/icons';
import { useVirtualizer } from '@tanstack/react-virtual';
import useWindowDimensions from '@/lib/useWindowDimensions';
const MemorizeStoriesPage = React.memo(StoriesPage)
const MemoizedPostItem = React.memo(PostItem)
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;

const VirtualizePostList = ({
    posts,
    loadMore,
    Header,
    Footer,
}: {
    posts: PostState
    loadMore?: () => void
    Header?: React.ReactNode
    Footer?: React.ReactNode
}) => {
    const parentRef = React.useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => posts.feeds, [posts.feeds])
    const count = useMemo(() => data.length, [data.length])

    // 
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 50, []),
        overscan: 12,
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
                }}
            >{Header}
                <>
                    <MemorizeStoriesPage />
                    <ShowUpload />
                </>
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
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
                                <div style={{ padding: '10px 0' }}>
                                    <MemoizedPostItem feed={data[virtualRow.index]}
                                        key={data[virtualRow.index].id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full text-center h-[80%]'>
                    <Button onClick={loadMore}
                        variant={"outline"}
                        className="rounded-full px-1 w-10 h-10">
                        <CirclePlus />
                    </Button>
                </div>
                {Footer}
            </div>
        </>
    )
}

export default VirtualizePostList


