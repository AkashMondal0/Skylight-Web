"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual';
import { AppHeader } from '@/components/Header/Header';
import { Stories } from '@/components/Stories/Story';
import { PostUploadProgress } from '@/components/Alert/PostUploadProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { RootState } from '@/redux/store';
import NotFound from '@/components/Error/NotFound';
import { PostState } from '@/redux/slice/post';
import { debounce } from 'lodash';
import { Loader2 } from 'lucide-react';
import { disPatchResponse } from '@/types';
import { PostFeed, PostFeedSkeleton } from '@/components/PostFeed';
import { NavigationSidebar, NavigationBottom } from '@/components/Navigation';

let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;
let pageLoaded = false
// fetch more posts
let totalFetchedItemCount: number | null = 0

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const dispatch = useDispatch()
  const posts = useSelector((Root: RootState) => Root.posts.feeds)
  const loading = useSelector((Root: RootState) => Root.posts.feedsLoading)
  const error = useSelector((Root: RootState) => Root.posts.feedsError)
  const count = useMemo(() => posts.length, [posts])
  const parentRef = React.useRef<HTMLDivElement>(null)
  const stopRef = React.useRef(false)

  const getPostApi = useCallback(async () => {
    // console.log('fetching more posts')
    if (totalFetchedItemCount === null) return
    try {
      const res = await dispatch(fetchAccountFeedApi({
        limit: 12,
        offset: totalFetchedItemCount
      }) as any) as disPatchResponse<PostState["feeds"]>

      if (res.payload.length > 0) {
        // if less than 12 items fetched, stop fetching
        if (res.payload.length < 12) {
          return totalFetchedItemCount = null
        }
        // if more than 12 items fetched, continue fetching
        totalFetchedItemCount += 12
      }
    } finally {
      stopRef.current = false
    }
  }, [])

  const fetchPosts = debounce(getPostApi, 1000)
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
      if (virtualizer.scrollDirection === 'forward'
        && !stopRef.current
        && totalFetchedItemCount !== null
        && virtualizer?.range?.startIndex === count - 4) {
        stopRef.current = true
        fetchPosts()
      }
    },
  })

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      if (!pageLoaded) {
        fetchPosts()
        pageLoaded = true
      }
    }
  }, [])

  const items = virtualizer.getVirtualItems()
  if (!mounted) return <></>

  if (pageLoaded && error) {
    return <NotFound message={error} />
  }

  return (
    <div className='flex'>
      <NavigationSidebar />
      <div className='w-full'>
        {/* <PostVirtualList /> */}
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
          {loading && count <= 0 ? <PostFeedSkeleton /> :
            pageLoaded && !loading && count <= 0 ?
              <div className='flex justify-center items-center h-full'>
                <h1 className='text-2xl'>No posts found</h1>
              </div> :
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
                        <PostFeed post={posts[virtualRow.index]}
                          key={posts[virtualRow.index].id} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>}
          <div className='h-12 w-full'>
            {loading ? <Loader2 className="animate-spin w-10 h-10 mx-auto text-accent" /> : <></>}
          </div>
          <NavigationBottom />
        </div>
      </div>
    </div>
  )
}