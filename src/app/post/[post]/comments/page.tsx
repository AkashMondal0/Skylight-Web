"use client"
import { CommentInput } from '@/components/comment/Comment.Input'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { Button } from '@/components/ui/button'
import { timeAgoFormat } from '@/lib/timeFormat'
import { fetchOnePostApi } from '@/redux/services/post'
import { RootState } from '@/redux/store'
import { Comment } from '@/types'
import { Heart, Smile } from 'lucide-react'
import React, { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = ({ params }: { params: { post: string } }) => {
  const dispatch = useDispatch()
  const loadedRef = useRef(false)
  const post = useSelector((Root: RootState) => Root.posts.viewPost)

  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchOnePostApi(params.post) as any)
      loadedRef.current = true;
    }
  }, []);

  if (!post) return null

  return (
    <>
      {/* header */}
      <div className='max-w-[600px] w-full min-h-dvh'>
        <div className='sticky top-0 bg-background z-10 py-3 border-b'>
          <h1 className="font-semibold text-lg text-center">Comments</h1>
        </div>

        <div className='h-full px-3 space-y-3'>
          <div className="flex border-b py-4 mb-4">
            <SkyAvatar url={post?.user?.profilePicture || "/user.jpg"} className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />
            <div className="flex flex-col ml-4">
              <p className="break-all"><span className='font-semibold text-lg'>
                {post?.user?.username}</span> {post?.content}
              </p>
              <div className="text-sm text-gray-500">{timeAgoFormat(post?.createdAt)}</div>
            </div>
          </div>
          {/* list */}
          {post?.comments.map((comment, i) => <CommentItem key={i} comment={comment} />)}
        </div>

        {/* input */}
        <CommentInput data={post} hideActionButtons />
      </div>
    </>
  )
}

export default Page

const CommentItem = memo(function CommentItem({
  comment
}: {
  comment?: Comment
}) {
  return (
    <>
      <div className="flex gap-2">
        <SkyAvatar url={comment?.user?.profilePicture || "/user.jpg"}
          className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />

        <div className="flex justify-between items-center w-full flex-1">
          <div>
            <p className="break-all text-base font-light">
              <span className='font-semibold text-lg mr-2'>
                {comment?.user?.username}
              </span>
              {comment?.content}
            </p>
            <div className="text-sm text-gray-500">{timeAgoFormat(comment?.createdAt)}</div>
          </div>

          {/* button */}
          <div className='flex items-center'>
            <Heart className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  )
})

const EmptyComment = () => {
  return <div className='flex justify-center items-center h-96'>
    <div>
      <p className='font-bold text-2xl text-center'>No comments yet</p>
      <p className='text-center'>Start the conversation.</p>
    </div>
  </div>
}