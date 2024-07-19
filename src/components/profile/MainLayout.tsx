"use client";
import { RootState } from "@/redux/store";
import { User } from "@/types";
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
import { fetchUserProfileDetailApi, fetchUserProfilePostsApi } from "@/redux/services/profile";
import { SkeletonProfilePage } from "./loading.page";
import { setLoadMoreProfilePosts } from "@/redux/slice/profile";
import { getRandomProfilePost } from "../sky/random";
import NotFound from "../home/NotFound";
import { CirclePlus } from "../sky/icons";
const MemoizedImageComponent = React.memo(ImageComponent)
const MemoizedHeroSection = React.memo(HeroSection)


interface Props {
    isProfile: boolean
    user: User | null
}
const MainLayout = ({ username }: {
    username: User["username"]
}) => {
    if (!username) {
        return <NotFound />
    }
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const profile = useSelector((Root: RootState) => Root.profile)
    const loadedRef = useRef(false)
    const isProfile = useMemo(() => session?.username === username, [session?.username])
    const [size, setSize] = useState(250)

    const loadMore = () => {
        const _posts = getRandomProfilePost(size)
        dispatch(setLoadMoreProfilePosts(_posts))
        setSize(size + 12)
    }

    useEffect(() => {
        if (!loadedRef.current) {
            document.title = username
            dispatch(fetchUserProfileDetailApi(username) as any)
            dispatch(fetchUserProfilePostsApi({
                username,
                limit: 12,
                offset: 0
            }) as any)
            loadedRef.current = true;
        }
    }, []);

    const renderHeader = useCallback(() => {
        // console.info("Header")
        return (<>
            <MemoizedHeroSection isProfile={isProfile} user={profile.state} />
        </>)
    }, [profile.state]);

    const renderFooter = useCallback(() => {
        // console.info("Header")
        return (
            <>
                <div
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Button onClick={loadMore}
                        variant={"outline"}
                        className="rounded-full px-1">
                        <CirclePlus />
                    </Button>
                </div>
            </>
        )
    }, []);

    if (!loadedRef.current || profile.loading) {
        return <SkeletonProfilePage />
    }

    if (profile.error) {
        return <NotFound />
    }

    return <>
        <VirtuosoGrid
            style={{
                height: '100%',
            }}
            // endReached={loadMore}
            overscan={2000}
            totalCount={profile.posts.length}
            components={{
                Header: renderHeader,
                Footer: renderFooter,
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
            itemContent={(index) => <MemoizedImageComponent data={profile.posts[index]} />}
        />
        <style>{`html, body, #root { height: 100% }`}</style>
    </>
}

export default MainLayout