'use client'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FetchFollowingsUserDataApi, UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions'
import { RootState } from '@/redux/store'
import { User } from '@/types'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from "@/components/ui/scroll-area"
import { SkeletonFollowUserCard } from "../../skeleton"
import { followingsDataClear } from "@/redux/slice/users"

const ModalFollowing = () => {
  const id = useParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const users = useSelector((state: RootState) => state.users)
  const profile = useSelector((state: RootState) => state.profile.user)
  const isProfile = profile?.id === users.profileData?.user?.id
  const loadedRef = useRef(false)

  const pageRedirect = (user: User) => {
    router.push(`/${user?.email}`)
  }

  useEffect(() => {
    if (!loadedRef.current && id?.profile && profile?.id) {
      const FetchFollowingsUser = async () => {
        if (id?.profile) {
          await dispatch(FetchFollowingsUserDataApi({
            profileId: users.profileData?.user?.id as string,
            skip: 0,
            size: 12
          }) as any)
        }
      }
      FetchFollowingsUser()
      loadedRef.current = true;
    }
  }, [profile?.id]);



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
        followerUserId: profile.id,
        isProfile: isProfile as boolean,
        type: "following",
        userId: user.id
      }) as any)

    }
  }

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      dispatch(followingsDataClear())
      router.back()
    }
  }
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px] pb-0">
        <h1 className="text-center font-semibold text-lg">Followings</h1>
        <Separator />
        <ScrollArea className="h-72 w-full rounded-md">
          {users.profileData.fetchFollow.followings.map((user, i) => <UserCard
            key={i} user={user}
            isProfile={isProfile}
            itself={profile?.id === user.id}
            pageRedirect={pageRedirect}
            handleActionFollow={handleActionFollow}
            handleActionUnFollow={handleActionUnFollow} />)}
          {users.profileData.fetchFollow.loading ? <div className='space-y-2'>{Array(10).fill(0).map((_, i) => <SkeletonFollowUserCard key={i} />)}</div> : <></>}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ModalFollowing


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
            {user.isFollowing ?
              <Button variant={"secondary"} className=" rounded-xl" onClick={() => handleActionUnFollow(user)}>
                Unfollow
              </Button> :
              <Button variant={"default"}
                className="rounded-xl" onClick={() => handleActionFollow(user)}>
                Follow
              </Button>}
          </>}
        </div>
      </div>
    </>
  )
}