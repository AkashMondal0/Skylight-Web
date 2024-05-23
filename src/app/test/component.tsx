"use client";
import PostItem from '@/components/home/Card/PostCard';
import { FeedPost } from '@/types';
import React, { useCallback, useEffect, useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'


export default function TestV({ data }: { data: FeedPost[] }) {
    const [loading, setLoading] = React.useState(false)
    const [posts, setPosts] = React.useState<FeedPost[]>([...data,...data,...data])

    // const loadMore = useCallback(() => {
    //     setLoading(true)
    //     return setTimeout(() => {
    //         setPosts((prev) => [...prev, ...data])
    //         setLoading(() => false)
    //     }, 500)
    // }, [,])

    // useEffect(() => {
    //     setPosts((prev) => [...prev, ...data])
    //     const timeout = loadMore()
    //     return () => clearTimeout(timeout)
    // }, [])

    return (
        <div style={{
            height: "100%",
            overflow: "hidden",
        }}
        className='w-dvw md:w-full'>
            <Virtuoso
                style={{ 
                    height: '100%',
                 }}
                data={posts}
                // context={{ loading, loadMore }}
                increaseViewportBy={200}
                itemContent={(index, post) => (
                    <PostItem feed={post} />
                )}
                // components={{ Footer }}
            />
            <style>{`html, body, #root { height: 100% }`}</style>
        </div>
    )
}

// const Footer = ({ context: { loadMore, loading } }) => {
//     return (
//         <div
//             style={{
//                 padding: '2rem',
//                 display: 'flex',
//                 justifyContent: 'center',
//             }}
//         >
//             <button disabled={loading} onClick={loadMore}>
//                 {loading ? 'Loading...' : 'Press to load more'}
//             </button>
//         </div>
//     )
// }