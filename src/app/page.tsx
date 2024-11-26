"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual';
import { AppHeader } from '@/components/Header/Header';
import { Stories } from '@/components/Stories/Story';
import { PostUploadProgress } from '@/components/Alert/PostUploadProgress';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '@/components/Error/NotFound';
import { debounce } from 'lodash';
import { Loader2 } from 'lucide-react';
import { Post, disPatchResponse } from '@/types';
import { PostFeed, PostFeedSkeleton } from '@/components/PostFeed';
import { NavigationSidebar, NavigationBottom } from '@/components/Navigation';
import { RootState } from '@/redux-stores/store';
import { fetchAccountFeedApi } from '@/redux-stores/slice/account/api.service';

let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;
let pageLoaded = false

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const dispatch = useDispatch()
  const posts = useSelector((Root: RootState) => Root.AccountState.feeds)
  const loading = useSelector((Root: RootState) => Root.AccountState.feedsLoading)
  const error = useSelector((Root: RootState) => Root.AccountState.feedsError)
  const feedsFetched = useSelector((Root: RootState) => Root.AccountState.feedsFetched)

  const count = useMemo(() => posts.length, [posts])
  const parentRef = React.useRef<HTMLDivElement>(null)
  const stopRef = React.useRef(false)

  const getPostApi = useCallback(async () => {
    if (loading === "pending" || feedsFetched) return
    await dispatch(fetchAccountFeedApi({
      limit: 12,
      offset: posts.length,
    }) as any) as disPatchResponse<Post[]>
    stopRef.current = false
  }, [posts.length, loading, feedsFetched])

  const fetchApi = debounce(getPostApi, 1000)

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
        && virtualizer?.range?.startIndex === count - 4) {
        stopRef.current = true
        fetchApi()
      }
    },
  })

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      if (!pageLoaded) {
        fetchApi()
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
        <div ref={parentRef as React.RefObject<HTMLDivElement>}
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
          {loading === "idle" ? <PostFeedSkeleton /> :
            count <= 0 ? <div className='w-full text-center text-xl font-bold'>No Feeds Available</div> :
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
            {count > 0 && loading === "pending" ? <Loader2 className="animate-spin w-10 h-10 mx-auto text-accent" /> : <></>}
          </div>
          <NavigationBottom />
        </div>
      </div>
    </div>
  )
}