'use client'
import { UserItemFollow } from '@/components/Card/UserItem'
import { LoadingUserCardWithButton } from '@/components/loading/Card'
import { Separator } from '@/components/ui/separator'
import { fetchUserProfileFollowingUserApi } from '@/redux/services/profile'
import { RootState } from '@/redux/store'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = ({
  params
}: {
  params: { profile: string }
}) => {
  const dispatch = useDispatch()
  const profile = useSelector((Root: RootState) => Root.profile)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchUserProfileFollowingUserApi({
        username: params.profile,
        offset: 0,
        limit: 10
      }) as any)
      loadedRef.current = true;
    }
  }, []);

  if (profile.followingListError) {
    return <>error followerList</>
  }

  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Following</h1>
        <Separator />
        <div className='h-5' />
        {profile.followingListLoading || !loadedRef.current ? <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</> : <>
          {profile.followingList?.map((user, i) => <UserItemFollow key={i} user={user} />)}
        </>}
      </div>
    </div>
  )
}

export default Page