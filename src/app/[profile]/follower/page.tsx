"use client";
import FollowPageLoading from '@/components/home/loading/FollowerLoading';
import UserCardFollower from '@/components/profile/client/UserCardFollower';
import { Separator } from '@/components/ui/separator';
import { fetchUserProfileFollowerUserApi } from '@/redux/services/profile';
import { RootState } from '@/redux/store';
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = ({
  params
}: {
  params: { profile: string }
}) => {
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => state.profile)
  const session = useSession().data?.user
  const isProfile = useMemo(() => session?.username === params.profile, [profile, params.profile])
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchUserProfileFollowerUserApi({
        username: params.profile,
        offset: 0,
        limit: 10
      }) as any)
      loadedRef.current = true;
    }
  }, []);


  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Followers</h1>
        <Separator />
        <div className='h-5' />
        {profile.followerList?.map((user, i) => <UserCardFollower
          key={i} user={user}
          isProfile={isProfile}
          itself={session?.id === user.id} />)}
        {profile.followerListLoading ? <FollowPageLoading /> : <></>}
      </div>
    </div>
  )
}

export default Page