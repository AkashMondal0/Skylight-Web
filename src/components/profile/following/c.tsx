'use client'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'
import { UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions'
import { RootState } from '@/redux/store'
import { User } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from "@/components/ui/scroll-area"
// import { followingsDataClear, setFollowingsUsers } from "@/redux/slice/users"
import { useSession } from "next-auth/react"
import UserCard from "./UserCard"

const ModalFollowing = ({ profileId }: { profileId: string }) => {
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
      // dispatch(setFollowingsUsers({
      //     Users: data,
      //     skip: 0,
      //     size: 12
      // }) as any)
      loadedRef.current = true;
    }
  }, []);



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

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // dispatch(followingsDataClear())
      router.back()
    }
  }
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px] pb-0">
        <h1 className="text-center font-semibold text-lg">Following</h1>
        <Separator />
        <ScrollArea className="h-72 w-full rounded-md">
          {/* {users.profileData.fetchFollow.followings.map((user, i) => <UserCard
            key={i} user={user}
            isProfile={isProfile}
            itself={profile?.id === user.id}
            pageRedirect={pageRedirect}
            handleActionFollow={handleActionFollow}
            handleActionUnFollow={handleActionUnFollow} />)} */}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ModalFollowing


