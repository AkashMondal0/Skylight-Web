"use client"
import React, { Fragment, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchOnePostApi } from '@/redux/services/post'
import NotFound from '@/components/Error/NotFound'
import { Post as PostItem } from "@/components/PostFeed/Post"
import { CommentHeader } from '@/components/Header/CommentHeader'
import { CommentList } from '@/components/comment/Comment.List'
import { CommentInput } from '@/components/comment/Comment.Input'
import PostImage from '@/components/PostFeed/PostImage'
import { PostPostLoading } from '@/components/loading/Post.Page'
import { AppNavbar } from '@/components/Header/Header'

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

  if (Post.viewPostLoading || !loadedRef.current) {
    return <Fragment><PostPostLoading /></Fragment>
  }

  if (!Post.viewPostLoading && Post.viewPostError || !Post.viewPost) {
    if (!Post.viewPostError) return <NotFound message="PAGE_NOT_FOUND" />
    return <NotFound message={Post.viewPostError} />
  }

  return (
    <div className='w-full h-full'>
      {/* lg */}
      <div className='w-full max-h-full max-w-[660px] mx-auto p-4 md:flex hidden '>
        <div className='justify-center'>
          <div className='flex border'>
            {/* left side */}
            <div className='w-96 h-auto m-auto'>
              <PostImage post={Post.viewPost} />
            </div>
            {/* right side */}
            <div className="flex max-h-[688px] flex-col justify-between w-full sm:w-96 flex-1 border-l">
              {/* header comment input  */}
              <CommentHeader data={Post.viewPost} />
              {/* body comments list  */}
              <CommentList data={Post.viewPost} />
              {/* footer comment input  */}
              <CommentInput data={Post.viewPost} />
            </div>
          </div>
        </div>
      </div>

      {/* sm  */}
      <div className="w-full h-full flex md:hidden flex-col">
        <AppNavbar name="Post" icon2={<div />}/>
        <PostItem post={Post.viewPost} />
      </div>
    </div>
  )
}

export default PostPage