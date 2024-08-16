"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { RootState } from '@/redux/store';
import NotFound from '@/components/Error/NotFound';
import PostVirtualList from '@/components/PostFeed/PostVirtualList';
import { PostLoading } from '@/components/loading/Home.page';
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
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

  if (!pageLoaded && posts.feedsLoading || posts.feedsLoading) {
    return <div className='w-full'>
      <PostLoading size={2} />
    </div>
  }

  if (posts.feedsError && pageLoaded) {
    return <NotFound message={posts.feedsError} />
  }

  return (
    <div className='flex'>
      <NavigationSidebar />
      <div className='w-full'>
        <PostVirtualList posts={posts.feeds} />
      </div>
    </div>

  )
}