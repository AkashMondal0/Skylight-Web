"use client"
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchOnePostApi } from '@/redux/services/post'
import { PageLoading } from '@/components/loading/Post.Page'
import NotFound from '@/components/Error/NotFound'
import { Post as PostItem } from "@/components/PostFeed/Post"
import { CommentHeader } from '@/components/Header/CommentHeader'
import { CommentList } from '@/components/comment/Comment.List'
import { CommentInput } from '@/components/comment/Comment.Input'
import PostImage from '@/components/PostFeed/PostImage'
import { ProfilePost } from '@/components/PostFeed/ProfilePost'

const PostPage = ({ params }: { params: { post: string } }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const Post = useSelector((Root: RootState) => Root.posts)
  const loadedRef = useRef(false)


  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchOnePostApi(params.post) as any)
      loadedRef.current = true;
    }
  }, []);

  if (!Post.viewPostLoading && Post.viewPostError) {
    return <NotFound />
  }

  if (Post.viewPostLoading) {
    return <PageLoading />
  }

  if (Post.viewPost) {
    return (
      <div className='w-full h-full'>
        {/* lg */}
        <div className='max-h-[690px] max-w-[860px] mx-auto p-4 md:flex hidden '>
          <div className='flex border'>
            {/* left side */}
            <div className='w-96 h-auto m-auto'>
              <PostImage post={Post.viewPost} />
            </div>
            {/* right side */}
            <div className="flex max-h-[688px] flex-col justify-between w-80 flex-1 border-l">
              {/* header comment input  */}
              <CommentHeader data={Post.viewPost} />
              {/* body comments list  */}
              <CommentList data={Post.viewPost} />
              {/* footer comment input  */}
              <CommentInput data={Post.viewPost} />
            </div>
          </div>
          {/* post */}
          <div className="grid grid-cols-3 w-full gap-1 my-10">
            <ProfilePost data={Post.viewPost} />
            <ProfilePost data={Post.viewPost} />
            <ProfilePost data={Post.viewPost} />
            <ProfilePost data={Post.viewPost} />
            <ProfilePost data={Post.viewPost} />
            <ProfilePost data={Post.viewPost} />
          </div>
        </div>

        {/* sm  */}
        <div className="w-full h-full flex md:hidden flex-col">
          <div className={"w-full h-14 border-b"}>
            <div className="flex justify-between items-center h-full w-full">
              <div className='md:hidden cursor-pointer'>
                <ChevronLeft size={30} onClick={() => router.back()} />
              </div>
              <p className='text-xl font-semibold'>
                Post
              </p>
              <div className='w-10' />
            </div>
          </div>
          <PostItem post={Post.viewPost} />
        </div>
      </div>
    )
  }
}

export default PostPage