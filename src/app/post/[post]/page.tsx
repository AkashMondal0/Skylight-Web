"use client"
import React, { useEffect, useRef } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Smile,
  Heart, MessageCircle,
  Send, BookMarked
} from 'lucide-react'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { RootState } from '@/redux/store'
import OptimizedImage from '@/components/sky/SkyImage'
import { createPostLikeApi, destroyPostLikeApi, fetchOnePostApi } from '@/redux/services/post'
import { PageLoading } from '@/components/post/loading.components'
import NotFound from '@/components/home/NotFound'

const PostPage = ({ params }: { params: { post: string } }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const Post = useSelector((root: RootState) => root.postFeed)
  const likeLoading = useSelector((root: RootState) => root.postFeed.likeLoading)
  const session = useSession().data?.user
  const inputRef = useRef<HTMLInputElement>(null)
  const loadedRef = useRef(false)


  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchOnePostApi(params.post) as any)
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

  if (!Post.viewPostLoading && Post.viewPostError) {
    return <NotFound />
  }

  if (Post.viewPostLoading) {
    return <PageLoading />
  }

  if (Post.viewPost) {
    return (
      <div className='w-full h-full p-5'>
        <div className="hidden md:flex max-h-[690px] mx-auto my-5 flex-wrap md:border max-w-[860px] min-h-min">
          {/* left side */}
          <div className='w-96 h-auto m-auto'>
            <Carousel>
              <CarouselContent>
                {Post.viewPost.fileUrl?.map((url, index) => (
                  <CarouselItem key={index}>
                    <OptimizedImage
                      src={url}
                      width={500}
                      height={500}
                      alt="Could't load image. Tap to retry"
                      sizes="(min-width: 808px) 50vw, 100vw"
                      fetchPriority="high"
                      className='w-auto h-auto cursor-default border m-auto rounded-lg userNotSelectImg'
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className='flex'>
                <CarouselPrevious variant={"default"} className='left-2' />
                <CarouselNext variant={"default"} className=' right-2' />
              </div>
            </Carousel>
          </div>
          {/* right side */}
          <div className="flex max-h-[688px] flex-col justify-between w-80 flex-1 border-l">
            {/* header comment input  */}
            <div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
              <div className="flex gap-2 items-center">
                <SkyAvatar url={Post.viewPost.user?.profilePicture || "/user.jpg"} className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />
                <div className="font-semibold text-lg">{Post.viewPost.user?.name}</div>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                  <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
                </svg>
              </div>
            </div>
            {/* body comments list  */}
            <ScrollArea className='h-auto flex-1'>
              <div className="flex p-4">
                <SkyAvatar url={Post.viewPost.user?.profilePicture || "/user.jpg"} className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />
                <div className="flex flex-col ml-4">
                  <p className="break-all"><span className='font-semibold text-lg'>
                    {Post.viewPost.user?.username}</span> {Post.viewPost.content}
                  </p>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
              </div>
              {
                Post.viewPost.comments?.length === 0 ? <div className='flex justify-center items-center h-96'>
                  <div>
                    <p className='font-bold text-2xl text-center'>No comments yet</p>
                    <p className='text-center'>Start the conversation.</p>
                  </div>
                </div> :
                  <>
                    {Post.viewPost.comments?.map((comment, index) => (
                      <div key={index} className="flex p-4 my-auto">
                        <SkyAvatar url={comment?.user.profilePicture || "/user.jpg"} className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />
                        <div className="flex flex-col ml-4">
                          <p className="break-all"><span className='font-semibold text-lg'>
                            {comment?.user.username}</span> {comment?.content}
                          </p>
                          <div className="text-sm text-gray-500">2 hours ago</div>
                        </div>
                      </div>
                    ))}
                  </>
              }
            </ScrollArea>
            {/* footer comment input  */}
            <div className='w-full bg-background p-2 border-t sticky bottom-0'>
              <div className='my-2 mx-3 flex justify-between'>
                <div className='flex space-x-3'>
                  <Heart onClick={handleLikeAndUndoLike} className={`w-7 h-7 cursor-pointer  ${Post.viewPost.is_Liked ? "text-red-500 fill-red-500" : ""}`} />
                  <MessageCircle className='w-7 h-7 cursor-pointer' onClick={() => { }} />
                  <Send className='w-7 h-7 cursor-pointer' />
                </div>
                <BookMarked className='w-7 h-7 cursor-pointer' />
              </div>

              <div className='px-3 pb-2 border-b'>
                <div className='font-semibold cursor-pointer' onClick={() => {
                  router.push(`/post/${Post.viewPost?.id}/liked_by`)
                }}>{Post.viewPost.likeCount} likes</div>
                <div>12 w</div>
              </div>

              <div className='w-auto h-auto rounded-2xl gap-1 bg-background flex items-center mt-2'>
                <div> <Smile className="w-6 h-6" /></div>
                <input type="text"
                  placeholder='Add a comment'
                  multiple
                  ref={inputRef}
                  className='w-full h-12 p-4 outline-none rounded-2xl border' />
                <Button variant={"default"}
                  // onClick={handleComment} 
                  className='w-full h-12 flex-1 rounded-2xl'>Post</Button>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-full flex md:hidden'>
          {/* <PostItem feed={data} /> */}
        </div>
      </div>
    )
  }
}

export default PostPage
