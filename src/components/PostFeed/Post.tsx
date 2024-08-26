"use client";
import React, { memo, useMemo } from 'react'
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
    Navigate
}: {
    post: PostFeedType,
    Navigate: (path: string) => void
}) {

    return (
        <div className='sm:max-w-[480px] w-full sm:mx-auto py-4 border-b p-1'>
            <PostHeader post={post} onNavigate={Navigate} />
            <PostImage post={post} />
            <PostActions post={post} onNavigate={Navigate} />
            <PostComments post={post} onNavigate={Navigate} />
        </div >
    )
}, (() => true))