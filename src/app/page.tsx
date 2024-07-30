"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
import { RootState } from '@/redux/store';
import NotFound from '@/components/Error/NotFound';
import PostVirtualList from '@/components/PostFeed/PostVirtualList';
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

  if (posts.feedsError && pageLoaded) {
    return <NotFound />
  }

  return (
    <>
      <div className='w-full h-full flex'>
        <NavigationSidebar />
        <div className='w-full'>
          <PostVirtualList
            posts={posts.feeds}
            Loading={posts.feedsLoading || !pageLoaded} />
        </div>
      </div>
    </>
  )
}