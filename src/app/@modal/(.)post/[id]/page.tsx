"use client"
import React, { useEffect, useRef, useState } from 'react'
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
import { ImageError } from '@/components/sky/SkyImage'


export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const loadedRef = useRef(false)
  const post = useSelector((Root: RootState) => Root.posts)
  const [imageError, setImageError] = useState(false)

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

  const onImageError = () => {
    setImageError(true)
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="p-0 flex w-[96%] md:w-full
        overflow-y-auto md:flex-nowrap flex-wrap gap-0
        max-w-[960px] min-h-min hideScrollbar"
        style={{
          maxHeight: "95%",
          borderRadius: 20,
          margin: 5
        }}>
        {post.viewPostLoading || !loadedRef ? <ModelPostLoading /> :
          post.viewPostError && loadedRef || !post.viewPost ? <NotFound />
            :
            <div className='flex flex-wrap w-full'>
              <div className='flex md:flex-1 h-full w-full min-w-96 items-center'>
                {imageError ? <ImageError /> :
                  <PostImage post={post.viewPost} onImageError={onImageError} />}
              </div>
              <div className="flex md:flex-1 h-full w-full min-w-96 flex-col justify-between border-l">
                {/* header comment input  */}
                <CommentHeader data={post.viewPost} />
                {/* body comments list  */}
                {<CommentList data={post.viewPost} />}
                {/* footer comment input  */}
                <CommentInput data={post.viewPost} />
              </div>
            </div>
        }
      </DialogContent>
    </Dialog>
  )
}
