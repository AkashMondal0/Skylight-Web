import React, { useCallback, useState } from 'react'
import { Heart, Send, MessageCircle, BookMarked } from 'lucide-react';
import { Post, disPatchResponse } from '@/types';
import { createPostLikeApi, destroyPostLikeApi, fetchPostLikesApi } from '@/redux/services/post';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import LikeViewModal from '@/components/Dialog/View.Like.Dialog';
const PostActions = ({
    post,
    onNavigate
}: {
    post: Post
    onNavigate: (path: string) => void,
}) => {
    const dispatch = useDispatch()
    const [like, setLike] = useState({
        isLike: post.is_Liked,
        likeCount: post.likeCount
    })
    const likeHandle = useCallback(async () => {
        const res = await dispatch(createPostLikeApi(post.id) as any) as disPatchResponse<any>
        if (!res.error) {
            setLike((pre) => ({ ...pre, isLike: true, likeCount: pre.likeCount + 1 }))
            return
        }
        toast("Something went wrong!")
    }, [])


    const disLikeHandle = useCallback(async () => {
        const res = await dispatch(destroyPostLikeApi(post.id) as any) as disPatchResponse<any>
        if (!res.error) {
            setLike((pre) => ({ ...pre, isLike: false, likeCount: pre.likeCount - 1 }))
            return
        }
        toast("Something went wrong!")
    }, [])

    const fetchLikes = async () => {
        dispatch(fetchPostLikesApi({
          offset: 0,
          limit: 16,
          id: post.id
        }) as any)
      }
    return (
        <>
            <div className=' mt-5 mb-1 mx-3 flex justify-between'>
                <div className='flex space-x-3'>
                    <Heart className={`w-7 h-7 cursor-pointer 
                 ${like.isLike ? "text-red-500 fill-red-500" : ""}`}
                        onClick={like.isLike ? disLikeHandle : likeHandle} />
                    <MessageCircle className='w-7 h-7 cursor-pointer hidden sm:block'
                        onClick={() => onNavigate(`/post/${post.id}`)} />
                    {/* sm */}
                    <MessageCircle className='w-7 h-7 cursor-pointer sm:hidden block'
                        onClick={() => onNavigate(`/post/${post.id}`)} />

                    <Send className='w-7 h-7 cursor-pointer' />
                </div>
                <BookMarked className='w-7 h-7 cursor-pointer' />
            </div>
            <div className='mx-3 space-y-2'>
                {/* lg*/}
                <div className='font-semibold cursor-pointer sm:hidden block' onClick={() => {
                    onNavigate(`/post/${post.id}/liked_by`)
                }}>{like.likeCount} likes</div>
                {/* sm */}
                <LikeViewModal>
                <div className='font-semibold cursor-pointer hidden sm:block' onClick={fetchLikes}>
                    {like.likeCount} likes
                </div>
                </LikeViewModal>
            </div>
        </>

    )
}

export default PostActions