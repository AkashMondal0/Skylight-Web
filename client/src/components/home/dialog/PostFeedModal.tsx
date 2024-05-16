
"use client"
import React, { RefObject, useRef } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FeedPost } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Smile,
  Heart, MessageCircle, Send, BookMarked
} from 'lucide-react'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { useDispatch } from 'react-redux'
import { createPostCommentApi } from '@/redux/slice/post-feed/api-functions'
import { useSession } from 'next-auth/react'


const PostFeedModal = ({ data }: {
  data: FeedPost
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const session = useSession().data?.user

  const handleComment = async () => {
    if (session) {
      await dispatch(createPostCommentApi({
        postId: data.id,
        userId: session?.id,
        comment: inputRef.current?.value ?? ""
      }) as any)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
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
      overflow-y-auto flex-wrap 
      max-w-[960px] min-h-min"
        style={{
          height: '95vh',
          maxHeight: '800px',
        }}>

        {/* left side */}
        <div className='w-96 h-auto m-auto'>
          <Carousel>
            <CarouselContent>
              {data?.fileUrl?.map((url, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={url}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    quality={100}
                    sizes="(min-width: 808px) 50vw, 100vw"
                    //(min-width: 808px) 50vw, 100vw 
                    priority={true}
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
        <div className="flex h-full flex-col justify-between w-80 flex-1 border-l">
          {/* header comment input  */}
          <div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
            <div className="flex gap-2 items-center">
              <SkyAvatar url={data?.authorData?.profilePicture || "/user.jpg"} className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />
              <div className="font-semibold text-lg">{data?.authorData?.name}</div>
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
              <SkyAvatar url={data?.authorData?.profilePicture || "/user.jpg"} className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />
              <div className="flex flex-col ml-4">
                <p className="break-all"><span className='font-semibold text-lg'>
                  {data?.authorData?.username}</span> {data?.caption}
                </p>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
            {
              data?.comments?.length === 0 ? <div className='flex justify-center items-center h-96'>
                <div>
                  <p className='font-bold text-2xl text-center'>No comments yet</p>
                  <p className='text-center'>Start the conversation.</p>
                </div>
              </div> :
                <>
                  {data?.comments?.map((comment, index) => (
                    <div key={index} className="flex p-4 my-auto">
                      <SkyAvatar url={comment?.authorData?.profilePicture || "/user.jpg"} className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]' />
                      <div className="flex flex-col ml-4">
                        <p className="break-all"><span className='font-semibold text-lg'>
                          {comment?.authorData?.username}</span> {comment?.comment}
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
                <Heart className={`w-7 h-7 cursor-pointer  ${data.alreadyLiked ? "text-red-500 fill-red-500" : ""}`} />
                <MessageCircle className='w-7 h-7 cursor-pointer' onClick={() => { }} />
                <Send className='w-7 h-7 cursor-pointer' />
              </div>
              <BookMarked className='w-7 h-7 cursor-pointer' />
            </div>

            <div className='px-3 pb-2 border-b'>
              <div className='font-semibold cursor-pointer' onClick={() => {
                router.push(`/post/${data.id}/liked_by`)
              }}>{data.likeCount} likes</div>
              <div>12 w</div>
            </div>

            <div className='w-auto h-auto rounded-2xl gap-1 bg-background flex items-center mt-2'>
              <div> <Smile className="w-6 h-6" /></div>
              <input type="text"
                placeholder='Add a comment'
                multiple
                ref={inputRef}
                className='w-full h-12 p-4 outline-none rounded-2xl border' />
              <Button variant={"default"} onClick={handleComment} className='w-full h-12 flex-1 rounded-2xl'>Post</Button>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default PostFeedModal
