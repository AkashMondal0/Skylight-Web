"use client"
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchPostLikesApi } from '@/redux/services/post'
import { LoadingUserCardWithButton } from '@/components/loading/Card'
import { UserItemFollow } from '@/components/Card/UserItem'

export default function Page({ params }: { params: { post: string } }) {
  const dispatch = useDispatch()
  const likes = useSelector((Root: RootState) => Root.posts)
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
        {likes.likeLoading ?
          <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</>
          :
          <>{likes.likesUserList?.map((user, i) => (
            <UserItemFollow key={i} user={user}/>))}</>}
      </div>
    </div>
  )
}
