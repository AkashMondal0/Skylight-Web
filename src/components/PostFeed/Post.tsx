"use client";
import React, { memo, useMemo } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Post as PostFeedType } from '@/types';
import { 
    PostHeader,
    PostImage,
    PostActions,
    PostComments
 } from './';

export const PostFeed = memo(function Post({
    post,
}: {
    post: PostFeedType
}) {
    // console.log("<Post/>")
    const router = useRouter()

    const memoPost = useMemo(() => {
        return post
    }, [post])

    const NavigatePage = (path: string) => {
        if (post.isDummy) return toast("this dummy post")
        router.push(path)
    }

    return (
        <div className='sm:max-w-[480px] w-full sm:mx-auto py-4 border-b p-1'>
            <PostHeader post={memoPost} onNavigate={NavigatePage} />
            <PostImage post={memoPost} />
            <PostActions post={memoPost} onNavigate={NavigatePage} />
            <PostComments post={memoPost} onNavigate={NavigatePage} />
        </div >
    )
}, ((preProps: any, nextProps: any) => true))