"use client"
import React, { useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import UserCardLikedView from '../Card/LikedCard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { closeModal } from '@/redux/slice/modal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchPostLikesApi } from '@/redux/slice/post-feed/api-functions'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from 'next-auth/react'
import { SkeletonUserCardWithButton } from '../loading/UserCard'



const LikeViewModal = () => {
  const modal = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()
  const session = useSession().data?.user
  const useFeed = useSelector((state: RootState) => state.postFeed)
  const postLikedUsers = useFeed.feed.Posts.find(post => post.id === modal.modalData?.postId)?.likes || []

  useEffect(() => {
    if (modal.modalData?.postId) {
      const StartApp = async () => {
        await dispatch(fetchPostLikesApi(modal.modalData?.postId) as any)
      }
      StartApp()
    }
  }, [dispatch, modal.modalData?.postId]);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      dispatch(closeModal())
    }
  }

  return (
    <Dialog open={modal.modalName === "Liked" && modal.isModalOpen || false}
      onOpenChange={onOpenChange}>
      <DialogContent className="p-0 h-[500px]">
        <div className='w-full flex justify-center min-h-[100dvh] h-full'>
          <div className='max-w-[600px] w-full p-4'>
            <h1 className="font-semibold text-lg text-center mb-4">Likes</h1>
            <Separator />
            <div className='h-5' />
            <ScrollArea className='h-[400px]' >
              {useFeed.fetchLoading ?
                <>{Array(10).fill(0).map((_, i) => <SkeletonUserCardWithButton key={i} />)}</> :
                <>{postLikedUsers?.map((user, i) => <UserCardLikedView key={i} user={user} isProfile={session?.id === user.id} />)}</>}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LikeViewModal

