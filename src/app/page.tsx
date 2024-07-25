"use client"
import VirtualizePostList from '@/components/home/VirtualizePostList';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import Sm_Header from '@/components/home/navigation/sm-header';
import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import NotFound from '@/components/home/NotFound';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { setMoreData } from '@/redux/slice/post';
import { getRandomPost } from '@/components/sky/random';
const MemorizeSm_Header = memo(Sm_Header)
const MemoizedSm_Navigation = memo(Sm_Navigation)
const MemoizedLg_Navigation = memo(Lg_Navigation)
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

  if (posts.feedsError) {
    return <NotFound message={posts.feedsError?.message} />
  }

  return (
    <>
      <div className='w-full h-full flex'>
        <MemoizedLg_Navigation />
        <div className='w-full'>
          <VirtualizePostList
            Header={<MemorizeSm_Header />}
            Footer={<MemoizedSm_Navigation />}
            posts={posts}
            loading={posts.feedsLoading}
            loadMore={loadMore} />
        </div>
      </div>
    </>
  )
}