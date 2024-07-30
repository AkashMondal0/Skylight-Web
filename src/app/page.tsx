"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
import PostVirtualList from '@/components/PostFeed/PostVirtualList';

let pageLoaded = false

export default function Page() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!pageLoaded) {
      dispatch(fetchAccountFeedApi() as any)
      pageLoaded = true
    }
  }, [])
  
  return (
    <>
      <div className='w-full h-full flex'>
        <NavigationSidebar />
        <div className='w-full'>
          <PostVirtualList />
        </div>
      </div>
    </>
  )
}