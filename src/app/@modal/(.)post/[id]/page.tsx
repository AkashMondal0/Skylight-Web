"use client"
import React, { useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchOnePostApi } from '@/redux/services/post'
import PostImage from '@/components/PostFeed/PostImage'
import { CommentHeader } from '@/components/Header/CommentHeader'
import { CommentList } from '@/components/comment/Comment.List'
import { CommentInput } from '@/components/comment/Comment.Input'


export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const loadedRef = useRef(false)
  const post = useSelector((Root: RootState) => Root.posts.viewPost)

  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchOnePostApi(params.id) as any)
      loadedRef.current = true;
    }
  }, []);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="p-0 flex w-[96%] md:w-full
        overflow-y-auto md:flex-nowrap flex-wrap gap-0
        max-w-[960px] min-h-min hideScrollbar"
        style={{
          height: '100vh',
          maxHeight: '800px',
        }}>
        {!post ? <>No Post</> :
          <>
            <PostImage post={post} />
            <div className="flex h-full flex-col justify-between w-full md:min-w-96 md:max-w-[90%] border-l">
              {/* header comment input  */}
              <CommentHeader data={post} />
              {/* body comments list  */}
              {<CommentList data={post} />}
              {/* footer comment input  */}
              <CommentInput data={post} />
            </div>
          </>}
      </DialogContent>
    </Dialog>
  )
}
