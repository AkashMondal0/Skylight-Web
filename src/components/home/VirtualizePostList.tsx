import React, { useCallback } from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem, { PostItemDummy } from './Card/PostCard';
import StoriesPage from './StoriesPage';
import ShowUpload from './alert/show-upload';
import { PostState } from '@/redux/slice/post';
import { Button } from '../ui/button';
import PageLoading from './loading/PageLoading';
import { CirclePlus } from '../sky/icons';
const MemorizeStoriesPage = React.memo(StoriesPage)
const MemoizedPostItem = React.memo(PostItem)
const MemoizedPostItemDummy = React.memo(PostItemDummy)

const VirtualizePostList = ({
    posts,
    loadMore,
    loading = false
}: {
    posts: PostState
    loadMore: () => void
    loading: boolean
}) => {


    const renderHeader = useCallback(() => {
        // console.info("Header")
        return (<>
            <MemorizeStoriesPage />
            <ShowUpload />
        </>)
    }, []);

    const renderFooter = useCallback(() => {
        // console.info("Header")
        return (
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
        )
    }, []);

    if (loading) {
        return <PageLoading />
    }

    return (
        <>
            <Virtuoso
                className='h-full w-full'
                data={posts.state}
                endReached={loadMore}
                increaseViewportBy={1000}
                itemContent={(index, post) => {
                    if (post?.isDummy) {
                        return <MemoizedPostItemDummy feed={post} key={post.id} />
                    } else {
                        return <MemoizedPostItem feed={post} key={post.id} />
                    }
                }}
                components={{
                    Header: renderHeader,
                    Footer: renderFooter
                }}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    )
}

export default VirtualizePostList


