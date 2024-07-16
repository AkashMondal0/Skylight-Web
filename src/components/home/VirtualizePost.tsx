/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FeedPost } from '@/types';
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem, { PostItemDummy } from './Card/PostCard';
import StoriesPage from './StoriesPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '../ui/button';
import ShowUpload from './alert/show-upload';
import SkeletonPostCard from './loading/PostCard';
import { fetchAccountFeedApi } from '@/redux/services/account';
import NotFound from "@/components/home/NotFound"

const VirtualizePost = () => {
    const dispatch = useDispatch()
    const posts = useSelector((Root: RootState) => Root.postFeed)
    const loadedRef = useRef(false)

    useEffect(() => {
        const fetchPosts = async () => {
            if (!loadedRef.current) {
                dispatch(fetchAccountFeedApi() as any)
                loadedRef.current = true
            }
        }
        fetchPosts()
    }, []);

    // const loadMore = () => {
    //     const _posts: FeedPost[] = Array.from({ length: 10 }, (_, i) => {
    //         const generate_img = `https://source.unsplash.com/random/600x900?sig=${i + size}`
    //         return {
    //             id: `${i + size}`,
    //             caption: `Caption ${i + size}`,
    //             fileUrl: [generate_img],
    //             commentCount: 10,
    //             likeCount: 10,
    //             createdAt: new Date().toDateString(),
    //             alreadyLiked: false,
    //             authorData: {
    //                 id: `user-${i + size}`,
    //                 username: `user-${i + size}`,
    //                 email: `user-${i} @gmail.com`,
    //                 name: `User ${i + size}`,
    //                 profilePicture: generate_img,
    //             },
    //             comments: [],
    //             likes: [],
    //             isDummy: true
    //         }
    //     })
    //     // dispatch(loadMoreData(_posts) as any)
    //     setSize(size + 10)
    // }

    if (posts.error) {
        return <NotFound message={posts.error?.message} />
    }

    return (
        <>
            <Virtuoso
                className='h-full w-full'
                data={posts.state}
                // endReached={loadMore}
                increaseViewportBy={3000}
                itemContent={(index, post) => {
                    return <PostItem feed={post} />
                }}
                components={{
                     Header: forwardRef(function HeaderComponent() {
                        return (
                            <>
                            <ShowUpload />
                            <StoriesPage />
                          </>
                        );
                    }),
                }}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    )
}

export default VirtualizePost


