"use client"
import React, { useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { RootState } from '@/redux/store'
import { createPostLikeApi, destroyPostLikeApi, fetchOnePostApi } from '@/redux/services/post'
import ImageView from '@/components/post/ImageView'
import CommentView from '@/components/post/CommentView'


export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const Post = useSelector((root: RootState) => root.postFeed)
  const likeLoading = useSelector((root: RootState) => root.postFeed.likeLoading)
  const session = useSession().data?.user
  const loadedRef = useRef(false)


  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchOnePostApi(params.id) as any)
      loadedRef.current = true;
    }
  }, []);

  const handleComment = async (inputValue: string) => {
    // if (session && data) {
    //   await dispatch(createPostCommentApi({
    //     postId: data.id,
    //     user: session,
    //     comment: inputRef.current?.value ?? "",
    //     type: 'singleFeed'
    //   }) as any)
    //   if (inputRef.current) {
    //     inputRef.current.value = ""
    //   }
    // }
  }
  const handleLikeAndUndoLike = () => {
    if (!Post.viewPost) return alert('No data')
    if (Post.viewPost.is_Liked && !likeLoading) {
      // unlike
      dispatch(destroyPostLikeApi(Post.viewPost.id) as any)
    } else {
      // like
      dispatch(createPostLikeApi(Post.viewPost.id) as any)
    }
  }

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="p-0 flex 
        overflow-y-auto flex-wrap gap-0
        max-w-[960px] min-h-min"
        style={{
          height: '95vh',
          maxHeight: '800px',
        }}>
        <ImageView
          data={Post.viewPost}
          loading={Post.viewPostLoading}
          error={Post.viewPostError} />
        <CommentView
          error={Post.viewPostError}
          loading={Post.viewPostLoading}
          data={Post.viewPost}
          handleComment={handleComment}
          handleLikeAndUndoLike={handleLikeAndUndoLike} />

      </DialogContent>
    </Dialog>
  )
}
