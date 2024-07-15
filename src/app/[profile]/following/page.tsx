'use client'
import FollowPageLoading from '@/components/home/loading/FollowerLoading'
import { SkeletonUserCard } from '@/components/home/loading/UserCard'
import UserCardFollowing from '@/components/profile/client/UserCardFollowing'
import { SkeletonUserCardFollowPage } from '@/components/profile/loading/skeleton'
import { Separator } from '@/components/ui/separator'
import { fetchUserProfileFollowingUserApi } from '@/redux/services/profile'
import { RootState } from '@/redux/store'
import { AuthorData, User } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

  const pageRedirect = (user: AuthorData) => {
    router.push(`/${user?.username}`)
  }

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



  const handleActionUnFollow = async (user: AuthorData) => {
    // if (profile?.id) {
    //   await dispatch(UserUnFollowingApi({
    //     followingUserId: user.id,
    //     followerUserId: profile.id,
    //     isProfile: isProfile as boolean,
    //     type: "following",
    //     userId: user.id
    //   }) as any)

    // }
  }
  const handleActionFollow = async (user: AuthorData) => {
    // if (profile?.id) {
    //   await dispatch(UserFollowingApi({
    //     followingUserId: user.id,
    //     followingUsername: user.username,
    //     followerUserId: profile.id,
    //     followerUsername: profile.username,

    //     isProfile: isProfile as boolean,
    //     type: "following",
    //     userId: user.id
    //   }) as any)

    // }
  }

  if (profile.followingListError) {
    return <>error followerList</>
  }

  if (profile.followingListLoading) {
    return <SkeletonUserCardFollowPage title="Following"/>
  }
  
  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Following</h1>
        <Separator />
        <div className='h-5' />
        {profile.followingList?.map((user, i) => <UserCardFollowing
          key={i} 
          user={user}
          isProfile={isProfile}
          itself={session?.id === user.id}
          pageRedirect={pageRedirect}
          handleActionFollow={handleActionFollow}
          handleActionUnFollow={handleActionUnFollow} 
          />)}
        {profile.followingListLoading ? <FollowPageLoading/> : <></>}
      </div>
    </div>
  )
}

export default Page