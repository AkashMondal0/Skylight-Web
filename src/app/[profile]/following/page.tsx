'use client'
import { SkeletonUserCardWithButton } from '@/components/home/loading/UserCard'
import UserCardFollowing from '@/components/profile/client/UserCardFollowing'
import { Separator } from '@/components/ui/separator'
import { fetchUserProfileFollowingUserApi } from '@/redux/services/profile'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = ({
  params
}: {
  params: { profile: string }
}) => {
  const dispatch = useDispatch()
  const profile = useSelector((Root: RootState)=> Root.profile)
  const session = useSession().data?.user
  const isProfile = useMemo(() => session?.username === params.profile, [profile, params.profile])
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
        {profile.followingListLoading ? <>{Array(10).fill(0).map((_,i)=><SkeletonUserCardWithButton key={i}/> )}</>: <>
                {profile.followingList?.map((user, i) => <UserCardFollowing
                  key={i} user={user}
                  isProfile={isProfile}
                  itself={session?.id === user.id} />)}
              </>}
      </div>
    </div>
  )
}

export default Page