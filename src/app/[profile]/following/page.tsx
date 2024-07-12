'use client'
import UserCardFollowing from '@/components/profile/following/UserCard'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {  UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions'
import { RootState } from '@/redux/store'
import { User } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PageFollowing = ({ data,profileId }: { data: User[],profileId:string }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const users = useSelector((state: RootState) => state.users)
  const profile = useSession().data?.user
  const isProfile = useMemo(() => profile?.username === profileId, [profile?.username, profileId])
  const loadedRef = useRef(false)

const pageRedirect = (user: User) => {
  router.push(`/${user?.username}`)
}

useEffect(() => {
  if (!loadedRef.current) {
    //   dispatch(setFollowingsUsers({
    //       Users: data,
    //       skip: 0,
    //       size: 12
    //   }) as any)
      loadedRef.current = true;
  }
}, [data, dispatch]);



  const handleActionUnFollow = async (user: User) => {
    if (profile?.id) {
      await dispatch(UserUnFollowingApi({
        followingUserId: user.id,
        followerUserId: profile.id,
        isProfile: isProfile as boolean,
        type: "following",
        userId: user.id
      }) as any)

    }
  }
  const handleActionFollow = async (user: User) => {
    if (profile?.id) {
      await dispatch(UserFollowingApi({
        followingUserId: user.id,
        followingUsername: user.username,
        followerUserId: profile.id,
        followerUsername: profile.username,

        isProfile: isProfile as boolean,
        type: "following",
        userId: user.id
      }) as any)

    }
  }
  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Following</h1>
        <Separator />
        <div className='h-5' />
        {/* {users.profileData.fetchFollow.followings.map((user, i) => <UserCardFollowing
          key={i} user={user}
          isProfile={isProfile}
          itself={profile?.id === user.id}
          pageRedirect={pageRedirect}
          handleActionFollow={handleActionFollow}
          handleActionUnFollow={handleActionUnFollow} />)}
        {users.profileData.fetchFollow.loading ? <>{Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}</> : <></>} */}

      </div>
    </div>
  )
}

export default PageFollowing