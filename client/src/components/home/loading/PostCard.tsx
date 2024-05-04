import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonPostCard = () => {
    return (
       <>
        <div className='max-w-[480px] w-full mx-auto py-2 mt-5'>
            <div className='flex justify-between px-2'>
                <div className='flex space-x-2 items-center'>
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className='space-y-2'>
                        <Skeleton className="h-4 w-52" />
                        <Skeleton className="h-4 w-20 " />
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <Skeleton className="h-[500px] w-full" />
            </div>            
        </div>
         <div className='max-w-[480px] w-full mx-auto py-2'>
         <div className='flex justify-between px-2'>
             <div className='flex space-x-2 items-center'>
                 <Skeleton className="h-12 w-12 rounded-full" />
                 <div className='space-y-2'>
                     <Skeleton className="h-4 w-52" />
                     <Skeleton className="h-4 w-20 " />
                 </div>
             </div>
         </div>
         <div className='my-4'>
             <Skeleton className="w-full h-[500px]" />
         </div>            
     </div>
       </>
    )
}

export default SkeletonPostCard