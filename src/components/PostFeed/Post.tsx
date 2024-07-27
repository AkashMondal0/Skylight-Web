"use client";
import React, { memo, useMemo } from 'react'
import { useRouter } from 'next/navigation';
import { Post as PostType } from '@/types';
import PostImage from '@/components/PostFeed/PostImage';
import { PostComments } from './PostComments';
import PostActions from './PostActions';
import PostHeader from './PostHeader';

export const Post = memo(function Post({
    post,
}: {
    post: PostType
}) {
    // console.log("<Post/>")
    const router = useRouter()

    const memoPost = useMemo(() => {
        return post
    }, [post])

    const NavigatePage = (path:string) => {
        router.push(path)
    }

    return (
        <div className='sm:max-w-[480px] w-full sm:mx-auto py-4 border-b'>
            <PostHeader post={memoPost}  onNavigate={NavigatePage}/>
            <PostImage post={memoPost} />
            <PostActions post={memoPost} onNavigate={NavigatePage}/>
            <PostComments post={memoPost} onNavigate={NavigatePage} />
        </div >
    )
})


// export const PostItemDummy = ({
//     feed,
// }: {
//     feed: PostType
// }) => {

//     return (
//         <div className='max-w-[480px] w-full mx-auto py-4 border-b'>
//             <div className='flex justify-between px-2'>
//                 <div className='flex space-x-2 items-center cursor-pointer'>
//                     <SkyAvatar url={feed.user.profilePicture || "/user.jpg"} className='h-12 w-12 mx-auto border-fuchsia-500 border-[3px] p-[2px]' />
//                     <div>
//                         <div className='font-semibold text-base'>{feed.user.username} .
//                             <span className='font-light text-base'>1d</span>
//                         </div>
//                         <div className='text-sm'>{feed.title}</div>
//                     </div>
//                 </div>
//                 <div className='flex items-center'>
//                     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
//                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
//                         strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
//                         <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
//                     </svg>
//                 </div>
//             </div>

//             <div className='my-4'>
//                 <Carousel>
//                     <CarouselContent>
//                         {feed.fileUrl.map((url, index) => (
//                             <CarouselItem key={index} className='flex flex-col m-auto'>
//                                 <OptimizedImage
//                                     showErrorIcon
//                                     src={url}
//                                     width={500}
//                                     height={500}
//                                     alt="Picture of the author"
//                                     fetchPriority={"high"}
//                                     sizes={"(min-width: 808px) 50vw, 100vw"}
//                                     className={cn('h-auto w-full cursor-pointer userNotSelectImg bg-muted')}
//                                 />
//                             </CarouselItem>
//                         ))}
//                     </CarouselContent>
//                     <div className='flex'>
//                         <CarouselPrevious variant={"default"} className='md:flex hidden left-2' />
//                         <CarouselNext variant={"default"} className='md:flex hidden right-2' />
//                     </div>
//                 </Carousel>
//             </div>

//             <div className=' mt-5 mb-1 mx-3 flex justify-between'>
//                 <div className='flex space-x-3'>
//                     <Heart className={`w-7 h-7 cursor-pointer  ${feed.is_Liked ? "text-red-500 fill-red-500" : ""}`} />
//                     <MessageCircle className='w-7 h-7 cursor-pointer hidden sm:block' />
//                     {/* sm */}
//                     <MessageCircle className='w-7 h-7 cursor-pointer sm:hidden block' />

//                     <Send className='w-7 h-7 cursor-pointer' />
//                 </div>
//                 <BookMarked className='w-7 h-7 cursor-pointer' />
//             </div>

//             <div className='mx-3 space-y-2'>
//                 {/* lg*/}
//                 <div className='font-semibold cursor-pointer sm:hidden block'>{feed.likeCount} likes</div>
//                 {/* sm */}
//                 <div className='font-semibold cursor-pointer hidden sm:block'>{feed.likeCount} likes</div>

//                 {/* close friend comments */}
//                 <p>
//                     <span
//                         className='font-semibold cursor-pointer mr-2'>
//                         {feed.user.username}
//                     </span>
//                     {feed.content}
//                 </p>
//                 {/* load more */}

//                 {/* lg*/}
//                 <div className='text-sm cursor-pointer hidden sm:block'>View all {feed.commentCount} comments</div>
//                 {/* sm */}
//                 <div className='text-sm cursor-pointer sm:hidden block'>View all {feed.commentCount} comments</div>
//             </div>

//         </div>
//     )
// }