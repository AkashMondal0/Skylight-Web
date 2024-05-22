"use client";
import { setLoadMoreProfilePosts, setUsers } from "@/redux/slice/users";
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
interface Props {
    isProfile: boolean
    user: User
}
const MainLayout = ({ data }: {
    data: User
}) => {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const users = useSelector((state: RootState) => state.users)
    const loadedRef = useRef(false)
    const isProfile = useMemo(() => session?.username === data.username, [session?.username, data.username])

    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(setUsers(data) as any)
            loadedRef.current = true;
        }
    }, [dispatch, data]);

    if (users?.profileData.user) {
        return <>
            <Virtualized
                isProfile={isProfile}
                user={users.profileData.user} />
        </>
    }
}

export default MainLayout

function Virtualized({
    isProfile,
    user
}: Props) {
    const [size, setSize] = useState(250)
    const dispatch = useDispatch()

    const loadMore = useCallback(() => {
        return setTimeout(() => {
            const _posts: FeedPost[] = Array.from({ length: 10 }, (_, i) => ({
                id: `${i + size}`,
                caption: `Caption ${i + size}`,
                fileUrl: [`https://source.unsplash.com/random/300x300?sig=${i + size}`],
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
            dispatch(setLoadMoreProfilePosts(_posts))
            setSize(size + 10)
        }, 500)
    }, [dispatch, size])

    useEffect(() => {
        const timeout = loadMore()
        return () => clearTimeout(timeout)
    }, [])

    return (
        <>
            <VirtuosoGrid
                style={{
                    height: '100%',
                }}
                // endReached={loadMore}
                overscan={5000}
                totalCount={user.posts.length}
                components={{
                    Header: forwardRef(function HeaderComponent() {
                        return (
                            <HeroSection isProfile={isProfile} user={user} />
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
                                <Button onClick={loadMore}>
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
                itemContent={(index) => <ImageComponent data={user.posts[index]} />} />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    );
}
