"use client"
import UserCardLikedView from '@/components/home/Card/LikedCard'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { fetchPostLikesApi } from '@/redux/services/post'

export default function Page({ params }: { params: { post: string } }) {
  const dispatch = useDispatch()
  const session = useSession().data?.user
  const likes = useSelector((state: RootState) => state.postFeed)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchPostLikesApi({
        offset: 0,
        limit: 16,
        id: params.post
      }) as any)
      loadedRef.current = true;
    }
  }, []);
  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Likes</h1>
        <Separator />
        <div className='h-5' />
        {likes.likesUserList?.map((user, i) => (
          <UserCardLikedView
            key={i} user={user}
            isProfile={session?.id === user.id} />))}
      </div>
    </div>
  )
}
