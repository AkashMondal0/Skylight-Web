"use client"
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingUserCardWithButton } from '@/components/loading/Card'
import { UserItemFollow } from '@/components/Card/UserItem'
import { RootState } from '@/redux-stores/store'
import { fetchPostLikesApi } from '@/redux-stores/slice/post/api.service'

export default function Page({ params }: { params: { post: string } }) {
  const dispatch = useDispatch()
  const likesUserList = useSelector((Root: RootState) => Root.PostState.likesUserList)
  const likesLoading = useSelector((Root: RootState) => Root.PostState.likesLoading)

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
        {likesLoading !== "normal" ?
          <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</>
          :
          <>{likesUserList?.map((user, i) => (
            <UserItemFollow key={i} user={user} />))}</>}
      </div>
    </div>
  )
}
