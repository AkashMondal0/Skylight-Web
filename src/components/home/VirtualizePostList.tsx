import React, { forwardRef} from 'react'
import { Virtuoso } from 'react-virtuoso'
import PostItem from './Card/PostCard';
import StoriesPage from './StoriesPage';
import ShowUpload from './alert/show-upload';
import { PostState } from '@/redux/slice/post';

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
                    return <PostItem feed={post} />
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
                }}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </>

    )
}

export default VirtualizePostList


