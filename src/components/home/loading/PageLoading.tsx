import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { SkeletonStoriesCard } from './StoriesCard'
import Sm_Header from '../navigation/sm-header'
import Sm_Navigation from '../navigation/sm-navigation'

const HomePageLoading = () => {
    return (
        <div className='w-full h-full'>
            <Sm_Header />
            <SkeletonStoriesCard />
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
            <Sm_Navigation />
        </div>
    )
}

export default HomePageLoading