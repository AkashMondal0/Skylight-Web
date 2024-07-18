import React from "react";
import { Skeleton } from "@/components/ui/skeleton"

export const CommentViewLoading = () => {
    return (<>
        <div className="flex h-full flex-col justify-between overflow-hidden flex-1 w-full border-l">
            {/* header comment input  */}
            <div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
                <div className="flex gap-2 items-center">
                    <Skeleton className='h-12 w-12 rounded-full border-fuchsia-500 border-[3px] p-[2px]' />
                    <div className="flex flex-col ml-4 space-y-2">
                        <Skeleton className='w-40 h-4' />
                        <Skeleton className='w-28 h-4' />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className='w-8 h-8 cursor-pointer' >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                    </div>
                </div>
            </div>
            {/* body comments list  */}
            <div className='h-auto flex-1'>

            </div>
            {/* footer comment input  */}
            <div className='w-full bg-background p-2 border-t sticky bottom-0'>
                <div className="flex flex-col ml-4 space-y-2">
                    <Skeleton className='w-40 h-4' />
                    <Skeleton className='w-28 h-4' />
                </div>

                <div className='w-auto h-auto rounded-2xl gap-1 bg-background flex items-center mt-2'>
                    <Skeleton className='w-full h-14 rounded-xl' />
                </div>
            </div>
        </div>
    </>)
}

export const ImageViewLoading = () => {
    return (<>
        <div className='sm:flex-1 flex-initial h-auto m-auto overflow-hidden'>
            <Skeleton className="w-[500px] h-[500px]" />
        </div>
    </>)
}

export const CommentViewError = () => {
    return (<>
        <div className="flex h-full flex-col justify-between w-80 flex-1 border-l overflow-hidden">
            {/* header comment input  */}
            <div className="flex justify-between bg-background items-center p-4 border-b h-20 z-10 sticky top-0 rounded-lg">
                <div className="flex gap-2 items-center">

                </div>
                <div className="flex items-center">
                    <div className='w-8 h-8 cursor-pointer' >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                    </div>
                </div>
            </div>
            {/* body comments list  */}
            <div className='h-auto flex-1'>
                <div className='flex justify-center items-center h-96'>
                    <div>
                        <p className='font-bold text-2xl text-center'>No comments yet</p>
                        <p className='text-center'>Start the conversation.</p>
                    </div>
                </div>
            </div>
            {/* footer comment input  */}
            <div className='w-full bg-background p-2 border-t sticky bottom-0 h-24'>

            </div>
        </div>
    </>)
}

export const PageLoading = ()=>{
    return (
        <div className='w-full h-full p-5 overflow-hidden'>
        <div className="hidden md:flex max-h-[690px] mx-auto my-5 flex-wrap md:border max-w-[860px] min-h-min">
          {/* left side */}
          <div className='flex-1 h-auto m-auto'>
            <ImageViewLoading />
          </div>
          {/* right side */}
          <div className="flex max-h-[688px] flex-col justify-between w-80 flex-1 border-l">
            <CommentViewLoading />
          </div>
        </div>
        <div className='w-full h-full flex md:hidden'>
          {/* <PostItem feed={data} /> */}
        </div>
      </div>
    )
}