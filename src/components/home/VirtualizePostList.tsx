import React, { forwardRef } from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem, { PostItemDummy } from './Card/PostCard';
import StoriesPage from './StoriesPage';
import ShowUpload from './alert/show-upload';
import { PostState } from '@/redux/slice/post';
import { Button } from '../ui/button';

const VirtualizePostList = ({
    posts,
    loadMore
}: {
    posts: PostState
    loadMore: () => void
}) => {

    return (
        <>
            <Virtuoso
                className='h-full w-full'
                data={posts.state}
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
                    Header: forwardRef(function HeaderComponent() {
                        return (
                            <>
                                <StoriesPage />
                                <ShowUpload />
                            </>
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
                        )
                    })
                }}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    )
}

export default VirtualizePostList


