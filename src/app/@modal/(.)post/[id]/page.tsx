"use client"
import React, { useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { RootState } from '@/redux/store'
import { createPostCommentApi, createPostLikeApi, destroyPostLikeApi, fetchOnePostApi } from '@/redux/services/post'
import CommentView from '@/components/Dialog/View.Comment.Dialog'
import PostImage from '@/components/PostFeed/PostImage'


export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const Post = useSelector((Root: RootState) => Root.posts)
  const likeLoading = useSelector((Root: RootState) => Root.posts.likeLoading)
  const session = useSession().data?.user
  const loadedRef = useRef(false)


  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchOnePostApi(params.id) as any)
      loadedRef.current = true;
    }
  }, []);

  const handleComment = async (inputValue: string) => {
    if (!session) return alert("session undefine")
    if (!Post.viewPost?.id) return alert("Post.viewPost.id undefine")
    await dispatch(createPostCommentApi({
      postId: Post.viewPost.id,
      user: {
        username: session.username,
        name: session.name,
        profilePicture: session.image as string,
        id: session.id,
        email: session.email
      },
      content: inputValue,
      authorId: session.id
    }) as any)
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
      <DialogContent className="p-0 flex w-[96%] md:w-full
        overflow-y-auto md:flex-nowrap flex-wrap gap-0
        max-w-[960px] min-h-min hideScrollbar"
        style={{
          height: '100vh',
          maxHeight: '800px',
        }}>
        <PostImage post={Post.viewPost} />
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
