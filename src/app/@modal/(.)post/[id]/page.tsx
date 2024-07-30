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
import { ModelPostLoading } from '@/components/loading/Post.Page'
import NotFound from '@/components/Error/NotFound'


export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const loadedRef = useRef(false)
  const post = useSelector((Root: RootState) => Root.posts)

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
          borderRadius:20
        }}>
        {post.viewPostLoading || !loadedRef ? <ModelPostLoading /> :
          post.viewPostError && loadedRef || !post.viewPost ? <NotFound /> :
            <>
              <PostImage post={post.viewPost} />
              <div className="flex h-full flex-col justify-between w-full md:min-w-96 md:max-w-[90%] border-l">
                {/* header comment input  */}
                <CommentHeader data={post.viewPost} />
                {/* body comments list  */}
                {<CommentList data={post.viewPost} />}
                {/* footer comment input  */}
                <CommentInput data={post.viewPost} />
              </div>
            </>
        }
      </DialogContent>
    </Dialog>
  )
}
