"use client";
import { setUsers } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import {
    useEffect,
    useMemo,
    useRef
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { VirtuosoGrid } from 'react-virtuoso'
import React, { forwardRef } from 'react'
import { ImageComponent } from './client/Post'
import HeroSection from './client/hero'
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
    return (
        <>
            <VirtuosoGrid
                style={{
                    height: '100%',
                }}
                totalCount={user.posts.length}
                components={{
                    Header: forwardRef(function HeaderComponent() {
                        return (
                            <HeroSection isProfile={isProfile} user={user} />
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
                                        margin: "0 auto",
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
                                padding: "0.2rem",
                                width: "33%",
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
                itemContent={(index) => <ItemWrapper>
                    <ImageComponent
                        url={user.posts[index].fileUrl[0]}
                        totalLikesCount={user.posts[index].likeCount}
                        totalCommentsCount={user.posts[index].commentCount}
                        totalPostsCount={user.postCount} />
                </ItemWrapper>}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    );
}

const ItemWrapper = ({ children, ...props }: any) => (
    <div
        {...props}
        style={{
            width: "100%",
        }}
    >
        {children}
    </div>
);