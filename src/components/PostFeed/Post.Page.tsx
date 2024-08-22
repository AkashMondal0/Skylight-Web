import React from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft } from "lucide-react";

export const ImageViewLoading = () => {
    return (<>
        <div className='sm:flex-1 flex-initial h-auto m-auto overflow-hidden'>
            <Skeleton className="w-98 h-[600px]" />
        </div>
    </>)
}

export const ModelPostSkeleton = () => {

    return (<>
        <div className="p-0 flex w-[96%] md:w-full
        overflow-hidden md:flex-nowrap flex-wrap gap-0
        max-w-[960px] min-h-min hideScrollbar"
            style={{
                height: '100vh',
                maxHeight: '800px',
            }}>
            <Skeleton className="w-96 h-full sm:flex-1" />
            <div className="flex h-full flex-col justify-between w-full border-l flex-1">
                {/* header comment input  */}
                <div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
                    <div className='flex space-x-2 items-center cursor-pointer'>
                        <Skeleton className='h-12 w-12 mx-auto border-[3px] p-[2px] rounded-full' />
                        <div className=" space-y-2">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-60 h-4" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Skeleton className="w-6 h-6" />
                    </div>
                </div>
                {/* body comments list  */}
                {Array(20).fill(0).map((_, i) => {
                    return (
                        <div className="flex p-4 my-auto" key={i}>
                            <Skeleton className='h-12 w-12 border-[3px] p-[2px] rounded-full' />
                            <div className="flex flex-col ml-4 gap-1">
                                <div className="break-all text-base font-light">
                                    <Skeleton className="w-60 h-4" />
                                </div>
                                <Skeleton className="w-32 h-3" />
                                <Skeleton className="w-12 h-4" />
                            </div>
                        </div>
                    )
                })}
                {/* footer comment input  */}
                {/* <CommentInput data={post} /> */}
            </div>
        </div>
    </>)
}

export const PostPageLoading = () => {

    return (
        <div className='w-full h-full smp-5 overflow-hidden'>
            <div className="hidden md:flex max-h-[690px] mx-auto my-5 flex-wrap md:border max-w-[860px] min-h-min">
                {/* left side */}
                <div className='flex-1 h-auto m-auto'>
                    <ImageViewLoading />
                </div>
                {/* right side */}
                <div className="flex max-h-[688px] flex-col justify-between w-80 flex-1 border-l">
                    {/* <CommentViewLoading /> */}
                </div>
            </div>

            <div className="w-full h-dvh flex md:hidden flex-col">
                <div className={"w-full h-14 border-b"}>
                    <div className="flex justify-between items-center h-full w-full">
                        <div className='md:hidden cursor-pointer'>
                            <ChevronLeft size={30}/>
                        </div>
                        <div className='text-xl font-semibold'>
                            Post
                        </div>
                        <div className='w-10' />
                    </div>
                </div>
                <PostFeedSkeleton />
            </div>

        </div>
    )
}

export const PostFeedSkeleton = ({ size = 1 }: { size?: number }) => {
    return (
        <>{Array(size).fill(0).map((_,i) => {
            return (
                <div className='sm:max-w-[480px] w-full sm:mx-auto py-6 border-b p-1' key={i}>
                    {/* post header */}
                    <div className='flex justify-between px-2'>
                        <div className='flex space-x-2 items-center cursor-pointer'>
                            <Skeleton className='h-12 w-12 mx-auto p-[2px] rounded-full' />
                            <div className="space-y-2">
                                <Skeleton className='h-4 w-60 p-[2px]' />
                                <Skeleton className='h-4 w-32 p-[2px]' />
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Skeleton className='h-4 w-10 mx-auto p-[2px]' />
                        </div>
                    </div>
                    {/* post image */}
                    <div className='px-[2px] w-auto h-auto m-auto my-2'>
                        <Skeleton className='h-[500px] w-full rounded-xl' />
                    </div>
                    {/* PostActions */}
                    <div className=' mt-5 mb-1 mx-3 flex justify-between'>
                        <div className='flex space-x-3'>
                            <Skeleton className='h-4 w-40 rounded-xl' />
                        </div>
                        <Skeleton className='h-5 w-5' />
                    </div>
                    {/* PostComments */}
                    <div className='mx-3 space-y-2'>
                        {/* close friend comments */}
                        <div className='flex space-x-2'>
                            <div>
                                <Skeleton className='h-4 w-20 rounded-xl' />
                            </div>
                        </div>
                        <Skeleton className='h-4 w-80 rounded-xl' />
                    </div>
                </div >)
        })}</>
    )
}