"use client"
import VirtualizePostList from '@/components/home/VirtualizePostList';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import Sm_Header from '@/components/home/navigation/sm-header';
import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import NotFound from '@/components/home/NotFound';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import StatusbarColorInitial from '@/provider/StatusbarColor';
import { setMoreData } from '@/redux/slice/post';
import { getRandomPost } from '@/components/sky/random';
import { debounce } from 'lodash';
const MemorizeSm_Header = memo(Sm_Header)
const MemoizedSm_Navigation = memo(Sm_Navigation)
const MemoizedLg_Navigation = memo(Lg_Navigation)



export default function Page() {
  const dispatch = useDispatch()
  const posts = useSelector((Root: RootState) => Root.post)
  const loadedRef = useRef(false)

  useEffect(() => {
    const fetchPosts = async () => {
      if (!loadedRef.current) {
        dispatch(fetchAccountFeedApi() as any)
        loadedRef.current = true
      }
    }
    fetchPosts()
  }, []);

  const loadMore = debounce(() => {
    const _posts = getRandomPost(10)
    dispatch(setMoreData(_posts) as any)
  }, 500)

  if (posts.error) {
    return <NotFound message={posts.error?.message} />
  }


  return (
    <>
      <StatusbarColorInitial />
      <div className='w-full h-full flex'>
        <MemoizedLg_Navigation />
        <div className='w-full'>
          <VirtualizePostList
            Header={<MemorizeSm_Header />}
            Footer={<MemoizedSm_Navigation />}
            posts={posts}
            loading={posts.loading || !loadedRef.current}
            loadMore={loadMore} />
        </div>
      </div>
    </>
  )
}