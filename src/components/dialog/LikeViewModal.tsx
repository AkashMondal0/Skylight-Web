"use client"
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoadingUserCardWithButton } from '../loading/Card'
import { UserItemFollow } from '../Card/UserItem'



const LikeViewModal = ({
  children
}: {
  children: React.ReactNode
}) => {
  const likes = useSelector((Root: RootState)=> Root.posts)

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 h-[500px]">
        <div className='w-full flex justify-center min-h-[100dvh] h-full'>
          <div className='max-w-[600px] w-full p-4'>
            <h1 className="font-semibold text-lg text-center mb-4">Likes</h1>
            <Separator />
            <div className='h-5' />
            <ScrollArea className='h-[400px]' >
              {likes.likeLoading ?
                <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</>
                :
                <>{likes.likesUserList?.map((user, i) => (<UserItemFollow key={i} user={user}/>))}</>}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LikeViewModal

