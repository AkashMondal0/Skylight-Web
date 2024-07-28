'use client'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchUserProfileFollowingUserApi } from "@/redux/services/profile"
import { LoadingUserCardWithButton } from "@/components/loading/Card"
import { UserItemFollow } from "@/components/Card/UserItem"
let loadedRef = false
const Page = ({
  params
}: {
  params: { profile: string }
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const profile = useSelector((Root: RootState) => Root.profile)

  useEffect(() => {
    if (!loadedRef) {
      dispatch(fetchUserProfileFollowingUserApi({
        username: params.profile,
        offset: 0,
        limit: 10
      }) as any)
      loadedRef = true;
    }
  }, []);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="p-0 h-[500px]">
        <div className='w-full flex justify-center min-h-[100dvh] h-full'>
          <div className='max-w-[600px] w-full p-4'>
            <h1 className="font-semibold text-lg text-center mb-4">Following</h1>
            <Separator />
            <div className='h-5' />
            <ScrollArea className='h-[400px]' >
              {profile.followingListLoading || !loadedRef ? <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</> : <>
                {profile.followingList?.map((user, i) => <UserItemFollow key={i} user={user} />)}
              </>}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Page


