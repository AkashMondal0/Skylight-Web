"use client"
import VirtualizePostList from '@/components/home/VirtualizePostList';
import NotFound from '@/components/home/NotFound';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { setMoreData } from '@/redux/slice/post';
import { getRandomPost } from '@/components/sky/random';
import HomePageLoading from '@/components/home/loading/PageLoading';
import { NavigationBottom, NavigationSidebar } from '@/components/NavigationSidebar/NavigationSidebar';
import { AppHeader } from '@/components/Header/Header';
let pageLoaded = false
const _posts = getRandomPost(10)

export default function Page() {
  const posts = useSelector((Root: RootState) => Root.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!pageLoaded) {
      dispatch(fetchAccountFeedApi() as any)
      pageLoaded = true
    }
  }, [])

  const loadMore = useCallback(() => {
    dispatch(setMoreData(_posts) as any)
  }, [])

  if (posts.feedsLoading || !pageLoaded) {
    return <HomePageLoading />
  }

  if (posts.feedsError && pageLoaded || !posts.feeds && pageLoaded) {
    return <NotFound message={posts.feedsError?.message} />
  }

  if (posts.feeds) {
    return (
      <>
        <div className='w-full h-full flex'>
          <NavigationSidebar />
          <div className='w-full'>
            <VirtualizePostList
              Header={<AppHeader />}
              Footer={<NavigationBottom />}
              posts={posts}
              loadMore={loadMore} />
          </div>
        </div>
      </>
    )
  }
}