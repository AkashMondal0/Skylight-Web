"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar';
import dynamic from 'next/dynamic';
const DynamicPostVirtualList = dynamic(() => import('@/components/PostFeed/PostVirtualList'),{
  loading:()=><></>
})

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
          <DynamicPostVirtualList />
        </div>
      </div>
    </>
  )
}