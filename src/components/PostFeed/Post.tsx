"use client";
import React, { memo, useCallback } from 'react'
import { Post as PostFeedType } from '@/types';
import {
    PostHeader,
    PostImage,
    PostActions,
    PostComments
} from '@/components/PostFeed';
import { useRouter } from 'next/navigation';

export const PostFeed = memo(function Post({
    post,
}: {
    post: PostFeedType,
}) {
    const router = useRouter()
    const Navigate = useCallback((path: string) => {
        router.push(path)
    }, [router])

    return (
        <div className='sm:max-w-[480px] w-full sm:mx-auto py-4 border-b p-1'>
            <PostHeader post={post} onNavigate={Navigate} />
            <PostImage post={post} />
            <PostActions post={post} onNavigate={Navigate} />
            <PostComments post={post} onNavigate={Navigate} />
        </div >
    )
}, (() => true))