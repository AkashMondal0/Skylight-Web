'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';

// Main App component
const App: React.FC = () => {
  // const [posts, setPosts] = useState<PostType[]>([]);
  // const [page, setPage] = useState<number>(1);

  // const fetchPosts = async () => {
  //   const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`);
  //   const data: PostType[] = await response.json();
  //   setPosts((prevPosts) => [...prevPosts, ...data]);
  // };

  //   useEffect(() => {
  //     fetchPosts();
  //   }, []);

  // const loadMorePosts = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  // const [counterValue, setCounterValue] = useState(0)

  // const counter = () => {
  //   setCounterValue((pre)=>pre + 1)
  //   setCounterValue((pre)=>pre + 1)
  //   setCounterValue((pre)=>pre + 1)

  // }
  return (
    <div>
      test
      {/* {counterValue}
      <Button onClick={counter}>counter</Button>
      <button onClick={loadMorePosts}>Load More Posts</button>
      <PostList posts={posts} />
      <Link href={"/"}>go</Link> */}
    </div>
  );
};

export default App;
