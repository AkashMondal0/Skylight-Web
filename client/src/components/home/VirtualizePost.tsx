"use client";
import { FeedPost } from '@/types';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem, { PostItemDummy } from './Card/PostCard';
import StoriesPage from './StoriesPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { loadMoreData, setFeedPosts } from '@/redux/slice/post-feed';
import { Button } from '../ui/button';

const VirtualizePost = ({ data }: { data: FeedPost[] }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.postFeed.feed)
    const loadedRef = useRef(false)
    const [size, setSize] = useState(0)

    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(setFeedPosts(data) as any)
            loadedRef.current = true;
        }
    }, [dispatch, data]);

    const loadMore = useCallback(() => {
        const _posts: FeedPost[] = Array.from({ length: 10 }, (_, i) => ({
            id: `${i + size}`,
            caption: `Caption ${i + size}`,
            fileUrl: [`https://picsum.photos/seed/${i + size}/500/500`],
            commentCount: 10,
            likeCount: 10,
            createdAt: new Date().toDateString(),
            alreadyLiked: false,
            authorData: {
                id: `user-${i + size}`,
                username: `user-${i + size}`,
                email: `user-${i} @gmail.com`,
                name: `User ${i + size}`,
            },
            comments: [],
            likes: [],
            isDummy: true
        }))
        setSize(size + 10)
        dispatch(loadMoreData(_posts) as any)
    }, [dispatch, size])

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
                    endReached={loadMore}
                    increaseViewportBy={200}
                    itemContent={(index, post) => {
                        if (post?.isDummy) {
                            return <PostItemDummy feed={post} />
                        } else {
                            return <PostItem feed={post} />
                        }
                    }}
                    components={{
                        Header: () => <StoriesPage />,
                        Footer: () => <div className='flex justify-center'><Button onClick={loadMore}>Load Dummy Posts</Button></div>
                    }}

                />
                <style>{`html, body, #root { height: 100% }`}</style>
            </div>
        </div>
    )
}

export default VirtualizePost


