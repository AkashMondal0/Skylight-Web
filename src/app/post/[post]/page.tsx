"use client"
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchOnePostApi } from '@/redux/services/post'
import NotFound from '@/components/Error/NotFound'
import { ModelPostSkeleton, PostFeed, PostFeedSkeleton, PostImage } from '@/components/PostFeed'
import { CommentHeader, CommentInput, CommentList } from '@/components/PostFeed/Comment'
import { AppNavbar } from '@/components/Header/Header'

const PostPage = ({ params }: { params: { post: string } }) => {
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
    return <>
      <div className='w-full md:flex justify-center hidden'>
        <div className='w-max'><ModelPostSkeleton /></div>
      </div>
      <div className="w-full h-full flex md:hidden flex-col">
        <AppNavbar name="Post" icon2={<div />} />
        <PostFeedSkeleton />
      </div>
    </>
  }

  if (!Post.viewPostLoading && Post.viewPostError || !Post.viewPost) {
    if (!Post.viewPostError) return <NotFound message="PAGE_NOT_FOUND" />
    return <NotFound message={Post.viewPostError} />
  }

  return (
    <>
      {/* lg */}
      <div className='w-full max-h-dvh max-w-[70%] mx-auto md:flex hidden border-2'>
        {/* left side */}
        <div className='w-full h-auto flex-1 flex items-center justify-center'>
          <PostImage post={Post.viewPost} />
        </div>
        {/* right side */}
        <div className="flex max-h-[688px] flex-col justify-between w-72 flex-1 border-l">
          {/* header comment input  */}
          <CommentHeader data={Post.viewPost} />
          {/* body comments list  */}
          <CommentList data={Post.viewPost} />
          {/* footer comment input  */}
          <CommentInput data={Post.viewPost} />
        </div>
      </div>
      {/* sm  */}
      <div className="w-full h-full flex md:hidden flex-col">
        <AppNavbar name="Post" icon2={<div />} />
        <PostFeed post={Post.viewPost}/>
      </div>
    </>
  )
}

export default PostPage