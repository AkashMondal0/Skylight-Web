"use client";
import { RootState } from "@/redux/store";
import { FeedPost, User } from "@/types";
import { useSession } from "next-auth/react";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { VirtuosoGrid } from 'react-virtuoso'
import React, { forwardRef } from 'react'
import { ImageComponent } from './client/Post'
import HeroSection from './client/hero'
import { Button } from "../ui/button";
import SkeletonProfile from "./loading/skeleton";
import { fetchUserProfileDetailApi, fetchUserProfilePostsApi } from "@/redux/services/profile";
interface Props {
    isProfile: boolean
    user: User | null
}
const MainLayout = ({ username }: {
    username: User["username"]
}) => {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const profile = useSelector((state: RootState) => state.profile)
    const loadedRef = useRef(false)
    const isProfile = useMemo(() => session?.username === username, [session?.username, username])

    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(fetchUserProfileDetailApi(username) as any)
            dispatch(fetchUserProfilePostsApi({
                username,
                limit: 12,
                offset: 0
            }) as any)
            loadedRef.current = true;
        }
    }, []);

    if (profile.loading) {
        return <SkeletonProfile />
    }

    if (profile.error) {
        return <div>error</div>
    }

    if (profile.state?.id) {
        return <>
            <VirtuosoGrid
                style={{
                    height: '100%',
                }}
                // endReached={loadMore}
                overscan={5000}
                totalCount={profile.posts.length}
                components={{
                    Header: forwardRef(function HeaderComponent() {
                        return (
                            <HeroSection isProfile={isProfile} user={profile.state} />
                        );
                    }),
                    Footer: forwardRef(function FooterComponent() {
                        return (
                            <div
                                style={{
                                    padding: '2rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                <Button>
                                    Load Dummy Posts
                                </Button>
                            </div>
                        );
                    }),
                    List: forwardRef(function ListComponent({ style, children, ...props }, ref) {
                        return (
                            <div className='mx-auto max-w-[960px]'>
                                <div
                                    ref={ref}
                                    {...props}
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        flexDirection: "row",
                                        ...style,
                                    }}>
                                    {children}
                                </div>
                            </div>
                        );
                    }),
                    Item: forwardRef(function ItemComponent({ style, children, ...props }, ref) {
                        return (
                            <div
                                {...props}
                                style={{
                                    padding: "0.1rem",
                                    width: "33.3%",
                                    display: "flex",
                                    flex: "none",
                                    alignContent: "stretch",
                                    boxSizing: "border-box",
                                }}>
                                {children}
                            </div>
                        );
                    }),
                }}
                itemContent={(index) => <ImageComponent data={profile.posts[index]} />}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>
    }
}

export default MainLayout

// function Virtualized({
//     isProfile,
//     user
// }: Props) {
//     const [size, setSize] = useState(250)
//     const dispatch = useDispatch()

//     const loadMore = () => {
//         // const _posts: FeedPost[] = Array.from({ length: 12 }, (_, i) => ({
//         //     id: `${i + size}`,
//         //     caption: `Caption ${i + size}`,
//         //     fileUrl: [`https://source.unsplash.com/random/300x300?sig=${i + size}`],
//         //     commentCount: 10,
//         //     likeCount: 10,
//         //     createdAt: new Date().toDateString(),
//         //     alreadyLiked: false,
//         //     authorData: {
//         //         id: `user-${i + size}`,
//         //         username: `user-${i + size}`,
//         //         email: `user-${i} @gmail.com`,
//         //         name: `User ${i + size}`,
//         //     },
//         //     comments: [],
//         //     likes: [],
//         //     isDummy: true
//         // }))
//         // // dispatch(setLoadMoreProfilePosts(_posts))
//         // setSize(size + 12)
// }