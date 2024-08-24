"use client"
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual';
import { NavigationBottom } from '@/components/Navigation/NavigationBottom';
import { AppHeader } from '@/components/Header/Header';
import { Stories } from '@/components/Stories/Story';
import { PostUploadProgress } from '@/components/Alert/PostUploadProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { RootState } from '@/redux/store';
import NotFound from '@/components/Error/NotFound';
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
import { PostState } from '@/redux/slice/post';
import { PostFeed, PostFeedSkeleton } from '@/components/PostFeed';
import { debounce } from 'lodash';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { disPatchResponse } from '@/types';
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;
let pageLoaded = false
// fetch more posts
let totalFetchedItemCount: number | null = 12

export default function Page() {
  const dispatch = useDispatch()
  const posts = useSelector((Root: RootState) => Root.posts)
  const [loadMore, setLoadMore] = useState(false)

  const fetchMore = debounce(async () => {
    if (loadMore) return
    if (!totalFetchedItemCount) return
    setLoadMore(true)
    try {
      const res = await dispatch(fetchAccountFeedApi({
        limit: 12,
        offset: totalFetchedItemCount
      }) as any) as disPatchResponse<PostState["feeds"]>
      if (res.payload.length > 0) {
        totalFetchedItemCount += 12
      }
      if (res.payload.length <= 0) {
        totalFetchedItemCount = null
      }
    } catch (error) {
      toast.error("Failed to fetch more posts, please try again")
    } finally {
      setLoadMore(false)
    }
  }, 1500)

  useEffect(() => {
    if (!pageLoaded) {
      dispatch(fetchAccountFeedApi({
        offset: 0,
        limit: 12
      }) as any)
    }
    pageLoaded = true
  }, [])

  return (
    <div className='flex'>
      <NavigationSidebar />
      <div className='w-full'>
        <PostVirtualList
          loadMore={loadMore}
          fetchMore={fetchMore}
          posts={posts} />
      </div>
    </div>
  )
}

const PostVirtualList = memo(function PostVirtualList({
  posts,
  fetchMore,
  loadMore
}: {
  posts: PostState,
  fetchMore: () => void
  loadMore: boolean
}) {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const data = useMemo(() => posts.feeds, [posts.feeds])
  const count = useMemo(() => data.length, [data.length])
  // 
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 50, []),
    overscan: 5,
    enabled: true,
    initialOffset: _kSavedOffset,
    initialMeasurementsCache: _KMeasurementsCache,
    onChange: (virtualizer) => {
      if (!virtualizer.isScrolling) {
        _KMeasurementsCache = virtualizer.measurementsCache;
        _kSavedOffset = virtualizer.scrollOffset || 0;
      }
      if (virtualizer.range?.startIndex && virtualizer.scrollDirection === 'forward') {
        const start = virtualizer.range.startIndex
        if (start === count - 2 && !loadMore) {
          fetchMore()
        }
      }
    },
  })
  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    }
  }, [])

  const items = virtualizer.getVirtualItems()
  if (!mounted) return <></>

  if (pageLoaded && posts.feedsError) {
    return <NotFound message={posts.feedsError} />
  }

  return (
    <>
      <div ref={parentRef}
        className='h-dvh'
        style={{
          width: '100%',
          overflowY: 'auto',
          contain: 'strict',
        }}
      >
        <AppHeader />
        <Stories />
        <PostUploadProgress />
        {!pageLoaded || !loadMore && posts.feedsLoading ? <PostFeedSkeleton /> :
          count <= 0 ? <EmptyPost /> :
            <div
              className='min-h-full'
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
                      <PostFeed post={data[virtualRow.index]}
                        key={data[virtualRow.index].id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>}
        <div className='h-12 w-full'>
          {loadMore ? <Loader2 className="animate-spin w-10 h-10 mx-auto text-accent" />  : <></>}
        </div>
        <NavigationBottom />
      </div>
    </>
  )
}, ((preProps, nextProps) => {
  return preProps.posts.feeds.length === nextProps.posts.feeds.length
    && preProps.posts.feedsLoading === nextProps.posts.feedsLoading
    && preProps.posts.feedsError === nextProps.posts.feedsError
    && preProps.loadMore === nextProps.loadMore
}))


const EmptyPost = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <h1 className='text-2xl'>No posts found</h1>
    </div>
  )
}