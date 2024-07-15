"use client";
import FollowPageLoading from '@/components/home/loading/FollowerLoading';
import UserCardFollower from '@/components/profile/client/UserCardFollower';
import { Separator } from '@/components/ui/separator';
import { fetchUserProfileFollowerUserApi } from '@/redux/services/profile';
import { RootState } from '@/redux/store';
import { AuthorData } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';;
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = ({
  params
}: {
  params: { profile: string }
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
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

  const pageRedirect = (user: AuthorData) => {
    router.push(`/${user?.username}`)
  }

  const handleActionUnFollow = async (user: AuthorData) => {
    // if (profile?.id) {
    //   await dispatch(UserUnFollowingApi({
    //     followingUserId: profile.id,
    //     followerUserId: user.id,
    //     isProfile: isProfile as boolean,
    //     type: "followers",
    //     userId: user.id
    //   }) as any)
    //   /// remove from list
    // }
  }

  const handleActionFollow = (user: AuthorData) => {
    // if (profile?.id) {
    //   dispatch(UserFollowingApi({
    //     followingUserId: user.id,
    //     followingUsername:user.username,
    //     followerUserId: profile.id,
    //     followerUsername: profile.username,
    //     isProfile: isProfile as boolean,
    //     type: "followers",
    //     userId: user.id
    // }) as any)
    // }
  }

  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Followers</h1>
        <Separator />
        <div className='h-5' />
        {profile.followerList?.map((user, i) => <UserCardFollower
          key={i} user={user}
          isProfile={isProfile}
          itself={session?.id === user.id}
          pageRedirect={pageRedirect}
          handleActionFollow={handleActionFollow}
          handleActionUnFollow={handleActionUnFollow} />)}
        {profile.followerListLoading ? <FollowPageLoading /> : <></>}
      </div>
    </div>
  )
}

export default Page