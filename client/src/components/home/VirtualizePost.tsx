"use client";
import { FeedPost } from '@/types';
import React, { Suspense } from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem from './Card/PostCard';
import StoriesPage from './StoriesPage';
import { SkeletonStoriesCard } from './loading/StoriesCard';

const VirtualizePost = ({ data }: { data: FeedPost[] }) => {
    const [posts, setPosts] = React.useState<FeedPost[]>(data)

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
                    data={posts}
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
