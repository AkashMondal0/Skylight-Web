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

const VirtualizePostList = ({
    posts,
    loadMore,
    loading = false
}: {
    posts: PostState
    loadMore: () => void
    loading: boolean
}) => {
    const parentRef = React.useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => posts.state, [posts.state])
    const count = useMemo(() => data.length, [data.length])


    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 45,
        overscan: 12,
        enabled: true,
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const items = virtualizer.getVirtualItems()

    if (!dimension.isMounted || !mounted) return <>dimension.isMounted</>

    return (
        <>
            <div
                ref={parentRef}
                className="List"
                style={{
                    height: dimension.height ?? "100%",
                    width: '100%',
                    overflowY: 'auto',
                    contain: 'strict',
                }}
            >
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
                                ref={virtualizer.measureElement}
                                className={
                                    virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                                }
                            >
                                <div style={{ padding: '10px 0' }}>
                                    <MemoizedPostItem feed={data[virtualRow.index]}
                                        key={data[virtualRow.index].id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Button onClick={loadMore}
                        variant={"outline"}
                        className="rounded-full px-1">
                        <CirclePlus />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default VirtualizePostList


