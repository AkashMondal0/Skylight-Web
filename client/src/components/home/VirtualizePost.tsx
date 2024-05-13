"use client";
import { FeedPost } from '@/types';
import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem from './Card/PostCard';
import StoriesPage from './StoriesPage';
import { SkeletonStoriesCard } from './loading/StoriesCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFeedPosts } from '@/redux/slice/post-feed';

const VirtualizePost = ({ data }: { data: FeedPost[] }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.postFeed.feed)
    const loadedRef = useRef(false)

    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(setFeedPosts(data) as any)
            loadedRef.current = true;
        }
    }, [dispatch, data]);

    return (
        <div className='w-full flex'>
            <div style={{
                height: "100%",
                overflow: "hidden",
            }}
                className='w-dvw md:w-full'>
                <Virtuoso
                    style={{
                        height: '100%',
                    }}
                    data={posts.Posts}
                    // context={{ loading, loadMore }}
                    increaseViewportBy={200}
                    itemContent={(index, post) => (
                        <PostItem feed={post} />
                    )}
                    components={{
                        Header: () => (
                            <Suspense fallback={<SkeletonStoriesCard />}>
                                <StoriesPage />
                            </Suspense>
                        ),
                        Footer: () => <div className='h-20'></div>,
                    }}

                />
                <style>{`html, body, #root { height: 100% }`}</style>
            </div>
        </div>
    )
}

export default VirtualizePost
