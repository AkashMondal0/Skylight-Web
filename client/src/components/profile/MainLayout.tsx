"use client";
import { setUsers } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import { FeedPost, User } from "@/types";
import { useSession } from "next-auth/react";
import {
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
            <div className='w-full flex h-full'>
                <div className='mx-auto w-full overflow-x-hidden h-auto'>
                    <Virtualized
                        isProfile={isProfile}
                        user={users.profileData.user} />
                </div>
            </div >
        </>
    }
}

export default MainLayout

function Virtualized({
    isProfile,
    user
}: Props) {
    const [size, setSize] = useState(0)
    const [userPosts, setUserPosts] = useState<FeedPost[]>(user.posts)
    const loadMore = () => {
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
        setUserPosts([...userPosts, ..._posts])
        setSize(size + 10)
    }
    return (
        <>
            <VirtuosoGrid
                style={{
                    height: '100%',
                }}
                endReached={loadMore}
                overscan={500}
                totalCount={userPosts.length}
                components={{
                    Header: forwardRef(function HeaderComponent() {
                        return (
                            <HeroSection isProfile={isProfile} user={user} />
                        );
                    }),
                    Footer: forwardRef(function FooterComponent() {
                        return (
                            <div className='flex justify-center'><Button onClick={loadMore}>Load Dummy Posts</Button></div>
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
                    Item: ({ children, ...props }) => (
                        <div
                            {...props}
                            style={{
                                padding: "0.1rem",
                                width: "33.3%",
                                display: "flex",
                                flex: "none",
                                alignContent: "stretch",
                                boxSizing: "border-box",
                            }}
                        >
                            {children}
                        </div>
                    )
                }}
                itemContent={(index) => <ImageComponent data={userPosts[index]} />}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    );
}
