import React, { memo, useCallback, useContext, useRef, useState } from 'react'
import { Heart, Send, MessageCircle, BookMarked } from 'lucide-react';
import { Notification, NotificationType, Post, disPatchResponse } from '@/types';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import LikeViewModal from '@/components/Dialog/View.Like.Dialog';
import { SocketContext } from '@/provider/Socket_Provider';
import { event_name } from '@/configs/socket.event';
import { useSession } from 'next-auth/react';
import { createPostLikeApi, destroyPostLikeApi, fetchPostLikesApi } from '@/redux-stores/slice/post/api.service';
import { createNotificationApi, destroyNotificationApi } from '@/redux-stores/slice/notification/api.service';

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
    const loading = useRef(false)

    const likeHandle = useCallback(async () => {
        if (loading.current) return
        if (post.isDummy) return toast("this dummy post")
        try {
            loading.current = true
            if (!session.data?.user) return toast("Please login first")
            const res = await dispatch(createPostLikeApi(post.id) as any) as disPatchResponse<any>
            if (res.error) {
                toast("Something went wrong!")
                return
            }
            setLike((pre) => ({ ...pre, isLike: true, likeCount: pre.likeCount + 1 }))
            if (post.user.id === session.data.user.id) return
            const notificationRes = await dispatch(createNotificationApi({
                postId: post.id,
                authorId: session.data?.user.id,
                type: NotificationType.Like,
                recipientId: post.user.id
            }) as any) as disPatchResponse<Notification>
            SocketState.sendDataToServer(event_name.notification.post, {
                ...notificationRes.payload,
                author: {
                    username: session.data?.user.username,
                    profilePicture: session.data?.user.image
                },
                post: {
                    id: post.id,
                    fileUrl: post.fileUrl,
                }
            })
        } catch (error) {
            toast("Something went wrong!")
        } finally {
            loading.current = false
        }
    }, [SocketState, post.fileUrl, post.id, post.isDummy, post.user.id, session?.data?.user])

    const disLikeHandle = useCallback(async () => {
        if (loading.current) return
        if (post.isDummy) return toast("this dummy post")
        try {
            loading.current = true
            if (!session.data?.user) return toast("Please login first")
            const res = await dispatch(destroyPostLikeApi(post.id) as any) as disPatchResponse<any>
            if (res.error) {
                return toast("Something went wrong!")
            }
            setLike((pre) => ({ ...pre, isLike: false, likeCount: pre.likeCount - 1 }))
            if (post.user.id === session.data.user.id) return
            await dispatch(destroyNotificationApi({
                postId: post.id,
                authorId: session.data?.user.id,
                type: NotificationType.Like,
                recipientId: post.user.id
            }) as any)
        } catch (error) {
            toast("Something went wrong!")
        } finally {
            loading.current = false
        }
    }, [post.id, post.isDummy, post.user.id, session?.data?.user])

    const fetchLikes = useCallback(async () => {
        if (post.isDummy) return toast("this dummy post")
        dispatch(fetchPostLikesApi({
            offset: 0,
            limit: 16,
            id: post.id
        }) as any)
    }, [post.id, post.isDummy])
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