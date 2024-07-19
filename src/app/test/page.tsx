'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';

// Define a type interface for Post
interface PostType {
  id: number;
  title: string;
  body: string;
  i: number
}

// Post component, memoized to prevent unnecessary re-renders
const Post: React.FC<{ post: PostType, i: number }> = React.memo(({ post, i }) => {
  console.info("component -> ", i)
  return (
    <div>
      <h2>{post.title.slice(0, 10)} -- {i}</h2>
    </div>
  );
});

// PostList component
const PostList: React.FC<{ posts: PostType[] }> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, i) => (
        <Post key={post.id} post={post} i={i} />
      ))}
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`);
    const data: PostType[] = await response.json();
    setPosts((prevPosts) => [...prevPosts, ...data]);
  };

  //   useEffect(() => {
  //     fetchPosts();
  //   }, []);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const [counterValue, setCounterValue] = useState(0)

  const counter = () => {
    setCounterValue((pre)=>pre + 1)
    setCounterValue((pre)=>pre + 1)
    setCounterValue((pre)=>pre + 1)

  }
  return (
    <div>
      {counterValue}
      <Button onClick={counter}>counter</Button>
      <button onClick={loadMorePosts}>Load More Posts</button>
      <PostList posts={posts} />
      <Link href={"/"}>go</Link>
    </div>
  );
};

export default App;
