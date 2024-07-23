import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PostItem from './Card/PostCard';
import StoriesPage from './StoriesPage';
import ShowUpload from './alert/show-upload';
import { PostState } from '@/redux/slice/post';
import { Button } from '../ui/button';
import { CirclePlus } from '../sky/icons';
import { VirtualizerOptions, useVirtualizer } from '@tanstack/react-virtual';
import useWindowDimensions from '@/lib/useWindowDimensions';
import { debounce } from 'lodash';
const MemorizeStoriesPage = React.memo(StoriesPage)
const MemoizedPostItem = React.memo(PostItem)

const VirtualizePostList = ({
    posts,
    loadMore,
    loading = false,
    Header,
    Footer,
    homePageScrollIndexCountRef
}: {
    posts: PostState
    loadMore?: () => void
    loading: boolean
    Header?: React.ReactNode
    Footer?: React.ReactNode
    homePageScrollIndexCountRef: any
}) => {
    const parentRef = React.useRef<HTMLDivElement>(null)
    const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => posts.state, [posts.state])
    const count = useMemo(() => data.length, [data.length])
    const previousScrollCount = homePageScrollIndexCountRef?.current
    const disableRef = useRef(false)

    const setScrollIndex = debounce(() => {
        homePageScrollIndexCountRef.current = virtualizer.range?.endIndex
    }, 600) // todo

    const onChange = useCallback(()=>{
        if (!disableRef.current && previousScrollCount > 0) {
            // console.info("previousScrollCount", previousScrollCount)
            virtualizer?.scrollToIndex(previousScrollCount);
            disableRef.current = true
        } //! this is not permanent solution
        setScrollIndex()
    }, [])
    // 
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 50, []),
        overscan: 12,
        enabled: true,
        onChange: onChange,
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
                        height: `${data.length > 0 ? "auto" : "100%"}`
                    }}>
                    <Button onClick={loadMore}
                        variant={"outline"}
                        className="rounded-full px-1">
                        <CirclePlus />
                    </Button>
                </div>
                {Footer}
            </div>
        </>
    )
}

export default VirtualizePostList


