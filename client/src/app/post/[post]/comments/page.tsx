"use client"
import SkyAvatar from '@/components/sky/SkyAvatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { User } from '@/types'
import { Smile } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const session = useSession().data?.user

  const handleComment = () => {
    console.log({
      // postId: data.id,
      userId: session?.id,
      comment: inputRef.current?.value
    })
    // if (session) {
    //   dispatch(createPostCommentApi({
    //     postId: data.id,
    //     userId: session?.id,
    //     comment: inputRef.current
    //   }) as any)
    // }
  }
  return (
    <>
      <div className='w-full flex flex-col justify-center min-h-dvh px-2'>
        <div className='h-auto'>
          {[...Array(50)].map((_, i) => <UserCard key={i} />)}
        </div>
      </div>
      <div className='w-auto h-auto rounded-2xl gap-1 bg-background flex items-center m-2 sticky bottom-0'>
        <div> <Smile className="w-6 h-6" /></div>
        <input type="text"
          placeholder='Add a comment'
          multiple
          ref={inputRef}
          className='w-full h-12 p-4 outline-none rounded-2xl border' />
        <Button variant={"default"} onClick={handleComment} className='w-full h-12 flex-1 rounded-2xl'>Post</Button>
      </div>
    </>
  )
}

export default Page

const UserCard = ({
  user
}: {
  user?: User
}) => {
  return (
    <>
      <div className='flex justify-between px-2 my-4'>
        <div className='flex space-x-2 items-center'>
          <SkyAvatar url={user?.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto ' />
          <div>
            <div className='font-semibold text-base'>{user?.username}</div>
            <div className='text-sm'>
              {user?.email}
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <Button variant={"default"} className=" rounded-xl">
            follow
          </Button>
        </div>
      </div>
    </>
  )
}