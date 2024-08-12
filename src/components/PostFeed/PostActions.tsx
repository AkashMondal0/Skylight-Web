/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useState } from 'react'
import { Heart, Send, MessageCircle, BookMarked } from 'lucide-react';
import { Notification, NotificationType, Post, PostActionsProps, disPatchResponse } from '@/types';
import { createPostLikeApi, destroyPostLikeApi, fetchPostLikesApi } from '@/redux/services/post';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import LikeViewModal from '@/components/Dialog/View.Like.Dialog';
import { SocketContext } from '@/provider/Socket_Provider';
import { event_name } from '@/configs/socket.event';
import { useSession } from 'next-auth/react';
import { createNotificationApi, destroyNotificationApi } from '@/redux/services/notification';

const PostActions = ({
    post,
    onNavigate
}: {
    post: Post
    onNavigate: (path: string) => void,
}) => {
    const dispatch = useDispatch()
    const SocketState = useContext(SocketContext)
    const session = useSession()
    const [like, setLike] = useState({
        isLike: post.is_Liked,
        likeCount: post.likeCount
    })

    const likeHandle = useCallback(async () => {
        if (post.isDummy) return toast("this dummy post")
        if (!session.data?.user) return toast("Please login first")
        const res = await dispatch(createPostLikeApi(post.id) as any) as disPatchResponse<any>
        if (!res.error) {
            setLike((pre) => ({ ...pre, isLike: true, likeCount: pre.likeCount + 1 }))
            const notificationRes = await dispatch(createNotificationApi({
                postId: post.id,
                authorId: session.data?.user.id,
                type: NotificationType.Like,
                recipientId: post.user.id
            }) as any) as disPatchResponse<Notification>
            const realTimeLike: Notification = {
                ...notificationRes.payload,
                user: {
                    id: session.data?.user.id,
                    username: session.data?.user.username,
                    profilePicture: session.data?.user.image ?? "",
                    name: session.data?.user.name,
                    email: session.data?.user.email,
                },
                post_owner: post.user,
            }
            SocketState.socket?.emit(event_name.notification.post.like, realTimeLike)
            return
        }
        toast("Something went wrong!")
    }, [SocketState.socket, post.id, post.isDummy, post.user, session.data?.user])

    const disLikeHandle = useCallback(async () => {
        if (!session.data?.user) return toast("Please login first")
        if (post.isDummy) return toast("this dummy post")
        const res = await dispatch(destroyPostLikeApi(post.id) as any) as disPatchResponse<any>
        if (!res.error) {
            setLike((pre) => ({ ...pre, isLike: false, likeCount: pre.likeCount - 1 }))
            dispatch(destroyNotificationApi({
                postId: post.id,
                authorId: session.data?.user.id,
                type: NotificationType.Like,
                recipientId: post.user.id
            }) as any)
            return
        }
        toast("Something went wrong!")
    }, [SocketState.socket, post.id, post.isDummy, post.user, session.data?.user])

    const fetchLikes = async () => {
        if (post.isDummy) return toast("this dummy post")
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
                        onClick={() => onNavigate(`/post/${post.id}/comments`)} />

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