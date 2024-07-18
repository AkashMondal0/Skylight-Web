"use client"
import VirtualizePostList from '@/components/home/VirtualizePostList';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import Sm_Header from '@/components/home/navigation/sm-header';
import Lg_Navigation from '@/components/home/navigation/lg-navigation';
import NotFound from '@/components/home/NotFound';
import { fetchAccountFeedApi } from '@/redux/services/account';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


export default function Page() {
  const dispatch = useDispatch()
  const posts = useSelector((Root: RootState) => Root.post)
  const loadedRef = useRef(false)

  useEffect(() => {
    const fetchPosts = async () => {
      if (!loadedRef.current) {
        dispatch(fetchAccountFeedApi() as any)
        loadedRef.current = true
      }
    }
    fetchPosts()
  }, []);

  // const loadMore = () => {
  //     const _posts: FeedPost[] = Array.from({ length: 10 }, (_, i) => {
  //         const generate_img = `https://source.unsplash.com/random/600x900?sig=${i + size}`
  //         return {
  //             id: `${i + size}`,
  //             caption: `Caption ${i + size}`,
  //             fileUrl: [generate_img],
  //             commentCount: 10,
  //             likeCount: 10,
  //             createdAt: new Date().toDateString(),
  //             alreadyLiked: false,
  //             authorData: {
  //                 id: `user-${i + size}`,
  //                 username: `user-${i + size}`,
  //                 email: `user-${i} @gmail.com`,
  //                 name: `User ${i + size}`,
  //                 profilePicture: generate_img,
  //             },
  //             comments: [],
  //             likes: [],
  //             isDummy: true
  //         }
  //     })
  //     // dispatch(loadMoreData(_posts) as any)
  //     setSize(size + 10)
  // }

  if (posts.error) {
    return <NotFound message={posts.error?.message} />
  }


  return (
    <>
      <div className='w-full h-full flex'>
        <Lg_Navigation />
        <div className='w-full md:py-0 py-14'>
          <Sm_Header />
          <VirtualizePostList posts={posts}
            loadMore={() => { }} />
          <Sm_Navigation />
        </div>
      </div>
    </>
  )
}