"use client"
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual';
import useWindowDimensions from '@/lib/useWindowDimensions';
import { Post } from '@/components/PostFeed/Post';
import { NavigationBottom } from '@/components/Navigation/NavigationBottom';
import { AppHeader } from '@/components/Header/Header';
import { Stories } from '@/components/Stories/Story';
import { PostUploadProgress } from '@/components/Alert/PostUploadProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { RootState } from '@/redux/store';
import NotFound from '@/components/Error/NotFound';
import { PostLoading } from '@/components/loading/Home.page';
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
import { PostState } from '@/redux/slice/post';
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;
let pageLoaded = false

export default function Page() {
  const dispatch = useDispatch()
  const posts = useSelector((Root: RootState) => Root.posts)

  useEffect(() => {
    if (!pageLoaded) {
      dispatch(fetchAccountFeedApi() as any)
      pageLoaded = true
    }
  }, [])

  return (
    <div className='flex'>
      <NavigationSidebar />
      <div className='w-full'>
        <PostVirtualList posts={posts} />
      </div>
    </div>
  )
}

const PostVirtualList = memo(function PostVirtualList({
  posts
}: {
  posts: PostState
}) {
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
    overscan: 5,
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
      >
        <AppHeader />
        <Stories />
        <PostUploadProgress />
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
            {!pageLoaded || posts.feedsLoading ? <PostLoading size={2} /> :
              pageLoaded && posts.feedsError ? <NotFound message={posts.feedsError} /> :
                items.map((virtualRow) => (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}>
                    <div style={{ padding: '10px 0' }}>
                      <Post post={data[virtualRow.index]}
                        key={data[virtualRow.index].id} />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <NavigationBottom />
      </div>
    </>
  )
}, ((preProps, nextProps) => {
  return preProps.posts.feeds.length === nextProps.posts.feeds.length
    && preProps.posts.feedsLoading === nextProps.posts.feedsLoading
    && preProps.posts.feedsError === nextProps.posts.feedsError
}))