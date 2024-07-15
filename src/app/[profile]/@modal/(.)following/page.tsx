'use client'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'
import { RootState } from '@/redux/store'
import { User } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSession } from "next-auth/react"
import { fetchUserProfileFollowingUserApi } from "@/redux/services/profile"
import UserCardFollowing from "@/components/profile/client/UserCardFollowing"
import FollowPageLoading from "@/components/home/loading/FollowerLoading"

const Page = ({
  params
}: {
  params: { profile: string }
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const profile = useSelector((state: RootState) => state.profile)
  const session = useSession().data?.user
  const isProfile = useMemo(() => profile?.state?.username === params.profile, [profile, params.profile])
  const loadedRef = useRef(false)

  const pageRedirect = (user: User) => {
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


  const handleActionUnFollow = async (user: User) => {

  }
  const handleActionFollow = async (user: User) => {

  }

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px] pb-0">
        <h1 className="text-center font-semibold text-lg">Following</h1>
        <Separator />
        <ScrollArea className="h-72 w-full rounded-md">
          {profile.followingList?.map((user, i) => <UserCardFollowing
            key={i} user={user}
            isProfile={isProfile}
            itself={session?.id === user.id}
            pageRedirect={pageRedirect}
            handleActionFollow={handleActionFollow}
            handleActionUnFollow={handleActionUnFollow} />)}
          {profile.followingListLoading ? <FollowPageLoading /> : <></>}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default Page


