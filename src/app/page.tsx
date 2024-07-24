"use client"
import VirtualizePostList from '@/components/home/VirtualizePostList';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import Sm_Header from '@/components/home/navigation/sm-header';
import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import NotFound from '@/components/home/NotFound';
import { memo, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PageStateContext } from '@/provider/PageState_Provider';
const MemorizeSm_Header = memo(Sm_Header)
const MemoizedSm_Navigation = memo(Sm_Navigation)
const MemoizedLg_Navigation = memo(Lg_Navigation)



export default function Page() {
  const posts = useSelector((Root: RootState) => Root.post)
  const pageStateContext = useContext(PageStateContext)

  useEffect(() => {
    if (!pageStateContext.loaded.home) {
      pageStateContext.fetchHomPageInitial()
    }
  }, [])

  if (posts.error) {
    return <NotFound message={posts.error?.message} />
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
            homePageScrollIndexCountRef={pageStateContext.homePageScrollIndexCountRef}
            loading={posts.loading}
            loadMore={pageStateContext.fetchHomePageMore} />
        </div>
      </div>
    </>
  )
}