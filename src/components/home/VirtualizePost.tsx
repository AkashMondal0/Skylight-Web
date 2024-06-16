/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ApiPayloadData, FeedPost } from '@/types';
import React, { useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem, { PostItemDummy } from './Card/PostCard';
import StoriesPage from './StoriesPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { loadMoreData, setFeedPosts } from '@/redux/slice/post-feed';
import { Button } from '../ui/button';
import ShowUpload from './alert/show-upload';
import SkeletonPostCard from './loading/PostCard';
import { fetchProfileFeedApi } from '@/redux/slice/profile/api-functions';
import { useRouter } from 'next/navigation';

const VirtualizePost = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.postFeed.feed)
    const loadedRef = useRef(false)
    const [size, setSize] = useState(160)
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            if (!loadedRef.current) {
                const res = await dispatch(fetchProfileFeedApi() as any) as { payload: ApiPayloadData<FeedPost[]> }
                if (res.payload?.code === 0) {
                    router.push('/not-found')
                    return
                }
                loadedRef.current = true;
            }
        }

        fetchPosts()
    }, [dispatch]);

    const loadMore = () => {
        const _posts: FeedPost[] = Array.from({ length: 10 }, (_, i) => {
            const generate_img = `https://source.unsplash.com/random/600x900?sig=${i + size}`
            return {
                id: `${i + size}`,
                caption: `Caption ${i + size}`,
                fileUrl: [generate_img],
                commentCount: 10,
                likeCount: 10,
                createdAt: new Date().toDateString(),
                alreadyLiked: false,
                authorData: {
                    id: `user-${i + size}`,
                    username: `user-${i + size}`,
                    email: `user-${i} @gmail.com`,
                    name: `User ${i + size}`,
                    profilePicture: generate_img,
                },
                comments: [],
                likes: [],
                isDummy: true
            }
        })
        dispatch(loadMoreData(_posts) as any)
        setSize(size + 10)
    }

    if (posts.loading) {
        return <SkeletonPostCard />
    }

    if (posts.error) {
        return <div>Error</div>
    }

    if(posts.Posts.length === 0) {
        return <div>No Posts</div>
    }

    return (
        <>
            <Virtuoso
                className='h-full w-full'
                data={posts.Posts}
                endReached={loadMore}
                increaseViewportBy={3000}
                itemContent={(index, post) => {
                    if (post?.isDummy) {
                        return <PostItemDummy feed={post} />
                    } else {
                        return <PostItem feed={post} />
                    }
                }}
                components={{
                    Header: () => <><StoriesPage /><ShowUpload /></>,
                    Footer: () => <div className='flex justify-center'>
                        <Button onClick={loadMore}>Load Dummy Posts</Button>
                    </div>
                }}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    )
}

export default VirtualizePost


