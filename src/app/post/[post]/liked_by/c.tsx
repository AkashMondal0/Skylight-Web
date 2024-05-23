"use client"
import UserCardLikedView from '@/components/home/Card/LikedCard'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { AuthorData } from '@/types'
import { setPostLikes } from '@/redux/slice/post-feed'

const PostLikedPage = ({ postId, data }: { postId: string, data: AuthorData[] }) => {
    // const dispatch = useDispatch()
    const session = useSession().data?.user
    // const useFeed = useSelector((state: RootState) => state.postFeed)
    // const postLikedUsers = useFeed.feed.Posts.find(post => post.id === postId)?.likes || []
    // const loadedRef = useRef(false)

    // useEffect(() => {
    //     if (!loadedRef.current) {
    //         dispatch(setPostLikes({
    //             postId: postId,
    //             users: data
    //         }) as any)
    //         loadedRef.current = true;
    //     }
    // }, [data, dispatch, postId]);

    return (
        <div className='w-full flex justify-center min-h-[100dvh] h-full'>
            <div className='max-w-[600px] w-full p-4'>
                <h1 className="font-semibold text-lg text-center mb-4">Likes</h1>
                <Separator />
                <div className='h-5' />
                {data?.map((user, i) => <UserCardLikedView key={i} user={user} isProfile={session?.id === user.id} />)}
            </div>
        </div>
    )
}

export default PostLikedPage




