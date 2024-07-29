"use client";
import React, { memo, useMemo } from 'react'
import { useRouter } from 'next/navigation';
import { Post as PostType } from '@/types';
import PostImage from '@/components/PostFeed/PostImage';
import { PostComments } from './PostComments';
import PostActions from './PostActions';
import PostHeader from './PostHeader';
import { toast } from 'sonner';

export const Post = memo(function Post({
    post,
}: {
    post: PostType
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