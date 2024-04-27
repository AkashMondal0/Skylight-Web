'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { FetchFollowingsUserDataApi, UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions'
import { RootState } from '@/redux/store'
import { User } from '@/types'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const id = useParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const users = useSelector((state: RootState) => state.users)
  const profile = useSelector((state: RootState) => state.profile)
  const isProfile = profile.profileData?.id === users.profileData?.user?.id

  const pageRedirect = (user: User) => {
    router.push(`/${user?.email}`)
  }
  const FetchFollowingsUser = () => {
    if (id?.profile) {
      dispatch(FetchFollowingsUserDataApi({
        profileId: id.profile as string,
        skip: 0,
        size: 12
      }) as any)
    }
  }

  useEffect(() => {
    FetchFollowingsUser()
  }, [])


  const handleActionUnFollow = (user: User) => {
    if (profile?.profileData?.id) {
      dispatch(UserUnFollowingApi({
        followingUserId: user.id,
        followerUserId: profile?.profileData?.id
      }) as any)
    }
  }
  const handleActionFollow = (user: User) => {
    if (profile?.profileData?.id) {
      dispatch(UserFollowingApi({
        followingUserId: user.id,
        followerUserId: profile?.profileData?.id
      }) as any)
    }
  }

  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Followings</h1>
        <Separator />
        <div className='h-5' />
        {users.profileData.fetchFollow.followings.map((user, i) => <UserCard
          key={i} user={user}
          isProfile={isProfile}
          itself={profile.profileData?.id === user.id}
          pageRedirect={pageRedirect}
          handleActionFollow={handleActionFollow}
          handleActionUnFollow={handleActionUnFollow} />)}
        {users.profileData.fetchFollow.loading ? <>{Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}</> : <></>}

      </div>
    </div>
  )
}

export default Page


const UserCard = ({
  user,
  pageRedirect,
  handleActionUnFollow,
  isProfile,
  itself,
  handleActionFollow
}: {
  user: User
  pageRedirect: (user: User) => void
  handleActionUnFollow: (user: User) => void
  isProfile?: boolean
  itself?: boolean
  handleActionFollow: (user: User) => void
}) => {
  if (!user) return null
  return (
    <>
      <div className='flex justify-between px-2 my-4'>
        <div className='flex space-x-2 items-center cursor-pointer' onClick={() => pageRedirect(user)}>
          <Avatar className='h-10 w-10 mx-auto'>
            <AvatarImage src={user.profilePicture || "/user.jpg"}
              alt="@sky" className='rounded-full' />
          </Avatar>
          <div>
            <div className='font-semibold text-base'>
              {user.username}
            </div>
            <div className='text-sm'>
              {user.email}
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          {!itself && <>
            {isProfile ? <>
              <Button variant={"secondary"} className=" rounded-xl" onClick={() => handleActionUnFollow(user)}>
                Unfollow
              </Button>
            </> : <>
              {user.isFollowing ? <Button variant={"secondary"}
                className="rounded-xl" onClick={() => handleActionUnFollow(user)}>
                Unfollow
              </Button> :
                <Button variant={"default"}
                  className="rounded-xl" onClick={() => handleActionFollow(user)}>
                  Follow
                </Button>
              }

            </>}
          </>}
        </div>
      </div>
    </>
  )
}

const SkeletonUserCard = () => {

  return (
    <>
      <div className='flex justify-between px-2 my-4'>
        <div className='flex space-x-2 items-center'>
          <Skeleton className='h-12 w-12 mx-auto rounded-full' />
          <div className='space-y-1'>
            <div className='font-semibold text-base'>
              <Skeleton className='w-28 h-4' />
            </div>
            <div className='text-sm'>
              <Skeleton className='w-16 h-3' />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <Skeleton className='w-20 h-9 rounded-xl' />
        </div>
      </div>
    </>
  )
}