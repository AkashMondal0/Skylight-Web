'use client'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfileFollowingUserApi } from "@/redux/services/profile"
import { LoadingUserCardWithButton } from "@/components/loading/Card"
import { UserItemFollow } from "@/components/Card/UserItem"
import { TempleDialog } from "@/components/Dialog/Temple.Dialog"
const Page = ({
  params
}: {
  params: { profile: string }
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
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

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }
  return (

    (<TempleDialog
      open
      onOpenChange={onOpenChange}
      headerTitle={'Following'}>
      {profile.followingListLoading || !loadedRef ? <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</> : <>
        {profile.followingList?.map((user, i) => <UserItemFollow key={i} user={user} />)}
      </>}
    </TempleDialog>)
  )
}

export default Page


