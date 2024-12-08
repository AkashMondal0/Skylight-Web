import React, { useCallback, useContext, useRef, useState } from 'react'
import { Heart, Send, MessageCircle, BookMarked } from 'lucide-react';
import { Notification, NotificationType, Post, disPatchResponse } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import LikeViewModal from '@/components/Dialog/View.Like.Dialog';
import { SocketContext } from '@/provider/Socket_Provider';
import { event_name } from '@/configs/socket.event';
import { createPostLikeApi, destroyPostLikeApi, fetchPostLikesApi } from '@/redux-stores/slice/post/api.service';
import { createNotificationApi, destroyNotificationApi } from '@/redux-stores/slice/notification/api.service';
import { RootState } from '@/redux-stores/store';
import useDebounce from '@/lib/debouncing';

const PostActions = ({
    post,
    onNavigate
}: {
    post: Post
    onNavigate: (path: string) => void,
}) => {
    const SocketState = useContext(SocketContext)
    const dispatch = useDispatch()
    const session = useSelector((state: RootState) => state.AccountState.session)
    const [like, setLike] = useState({
        isLike: post.is_Liked,
        likeCount: post.likeCount
    })
    const loading = useRef(false)

    const likeHandle = useCallback(async () => {
        if (loading.current) return
        try {
            loading.current = true
            if (!session) return toast("You are not logged in")
            const res = await createPostLikeApi(post.id)
            if (!res) {
                return toast("Something went wrong!")
            }
            if (post.user.id === session.id) return
            const notificationRes = await dispatch(createNotificationApi({
                postId: post.id,
                authorId: session.id,
                type: NotificationType.Like,
                recipientId: post.user.id
            }) as any) as disPatchResponse<Notification>
            SocketState.sendDataToServer(event_name.notification.post, {
                ...notificationRes.payload,
                author: {
                    username: session?.username,
                    profilePicture: session?.profilePicture
                },
                post: {
                    id: post.id,
                    fileUrl: post.fileUrl[0].urls?.low,
                }
            })
        } catch (error) {
            toast("Something went wrong!")
        } finally {
            loading.current = false
        }
    }, [post.fileUrl.length, post.id, post.user.id, session])

    const disLikeHandle = useCallback(async () => {
        if (loading.current) return
        try {
            loading.current = true
            if (!session) return toast("You are not logged in")
            const res = await destroyPostLikeApi(post.id)
            if (!res) {
                return toast("Something went wrong!")
            }
            if (post.user.id === session.id) return
            await dispatch(destroyNotificationApi({
                postId: post.id,
                authorId: session.id,
                type: NotificationType.Like,
                recipientId: post.user.id
            }) as any)
        } catch (error: any) {
            toast('Something went wrong!')
        } finally {
            loading.current = false
        }
    }, [post.id, post.user.id, session])


    const delayLike = useCallback(() => {
        if (like.isLike) {
            disLikeHandle()
        } else {
            likeHandle()
        }
    }, [like.isLike])

    const debounceLike = useDebounce(delayLike, 500)

    const onLike = useCallback(() => {
        if (like.isLike) {
            setLike({
                isLike: false,
                likeCount: like.likeCount - 1
            })
        } else {
            setLike({
                isLike: true,
                likeCount: like.likeCount + 1
            })
        }
        debounceLike()
    }, [like.isLike, like.likeCount])

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
                        onClick={onLike} />
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