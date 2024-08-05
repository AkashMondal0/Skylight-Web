"use client"
import NotFound from '@/components/Error/NotFound'
import { CommentInput } from '@/components/comment/Comment.Input'
import { CommentPageLoading } from '@/components/loading/Message.page'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { timeAgoFormat } from '@/lib/timeFormat'
import { fetchOnePostApi, fetchPostCommentsApi } from '@/redux/services/post'
import { RootState } from '@/redux/store'
import { Comment } from '@/types'
import { ChevronLeft, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
let loadedRef = false
let loadedPostId = "noPostId"

const Page = ({ params }: { params: { post: string } }) => {
  const dispatch = useDispatch()
  const post = useSelector((Root: RootState) => Root.posts.viewPost)
  const loading = useSelector((Root: RootState) => Root.posts.viewPostLoading)
  const router = useRouter()

  useEffect(() => {
    if (params.post !== loadedPostId) {
      dispatch(fetchOnePostApi(params.post) as any)
      dispatch(fetchPostCommentsApi({
        id: params.post,
        offset: 0,
        limit: 12
      }) as any)
      loadedRef = true;
    }
  }, []);

  if (loading || !loadedRef) return <CommentPageLoading />

  if (!post && loadedRef) return <NotFound />

  if (post) {
    return (
      <>
        {/* header */}
        <div className='max-w-[600px] w-full min-h-dvh mx-auto flex flex-col justify-between'>
          <div>
            {/* header */}
            <div className="flex justify-between items-center w-full h-14 border-b">
              <div className='md:hidden cursor-pointer'>
                <ChevronLeft size={30} onClick={() => router.back()} />
              </div>
              <div className='text-xl font-semibold'>
                Comments
              </div>
              <div className='w-10' />
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
              {post.comments.length <= 0 ? <EmptyComment /> : post?.comments.map((comment, i) => <CommentItem key={i} comment={comment} />)}
            </div>
          </div>

          {/* input */}
          <CommentInput data={post} hideActionButtons />
        </div>
      </>
    )
  }
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
            <p className="break-all text-base">
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