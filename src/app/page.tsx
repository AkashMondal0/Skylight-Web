"use client"
import VirtualizePostList from '@/components/home/VirtualizePostList';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import Sm_Header from '@/components/home/navigation/sm-header';
import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import NotFound from '@/components/home/NotFound';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import StatusbarColorInitial from '@/provider/StatusbarColor';
import { setMoreData } from '@/redux/slice/post';
import { getRandomPost } from '@/components/sky/random';

export default function Page() {
  const dispatch = useDispatch()
  const posts = useSelector((Root: RootState) => Root.post)
  const loadedRef = useRef(false)
  const [size, setSize] = useState(160)

  useEffect(() => {
    const fetchPosts = async () => {
      if (!loadedRef.current) {
        dispatch(fetchAccountFeedApi() as any)
        loadedRef.current = true
      }
    }
    fetchPosts()
  }, []);

  const loadMore = () => {
    const _posts = getRandomPost(size)
    dispatch(setMoreData(_posts) as any)
    setSize(size + 10)
  }

  if (posts.error) {
    return <NotFound message={posts.error?.message} />
  }


  return (
    <>
      <StatusbarColorInitial />
      <div className='w-full h-full flex'>
        <Lg_Navigation />
        <div className='w-full md:py-0 py-14'>
          <Sm_Header />
          <VirtualizePostList posts={posts}
            loading={posts.loading || !loadedRef.current}
            loadMore={loadMore} />
          <Sm_Navigation />
        </div>
      </div>
    </>
  )
}