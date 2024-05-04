import { User } from '@/types'
import React from 'react'
import { ActionButtonsSM } from './client/button'
import { Link2, Plus } from 'lucide-react'
import Link from 'next/link'
import Dynamic from 'next/dynamic'
import { Skeleton } from '../ui/skeleton'

const StoriesComponent = Dynamic(() => import('./Stories'), {
    loading: () => <div className='flex gap-5 my-5 px-2'>
        <Skeleton className='w-16 h-16 rounded-full' />
        <Skeleton className='w-16 h-16 rounded-full' />
        <Skeleton className='w-16 h-16 rounded-full' />
    </div>
})
const PostComponent = Dynamic(() => import('./Post'), {
    loading: () => <div className="grid grid-cols-3 gap-1 w-full p-1">
        {Array(9).fill(0).map((post, index) => (
            <Skeleton key={index} className='aspect-square w-full h-full object-cover' />
        ))}
    </div>
})

interface Props {
    isProfile: boolean
    user: User
}
const Sm_Device = ({
    isProfile,
    user: userProfileData,
}: Props) => {
    return (
        <div className='sm:hidden block'>
            {/* profile header */}
            <div className='flex gap-3 my-5 items-center px-2'>
                <img src={userProfileData.profilePicture || "/user.jpg"}
                    className='w-24 h-24 rounded-full object-cover bg-slate-400'
                    alt={'no image'} />
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2'>
                        <p className='text-xl px-3'>{userProfileData.email}</p>
                    </div>
                    <ActionButtonsSM
                        isFollowing={userProfileData.isFollowing}
                        user={userProfileData}
                        isProfile={isProfile} />
                </div>
            </div>
            {/*  */}
            <>
                <div className='flex justify-between flex-col px-3'>
                    <p>{userProfileData.username}</p>
                    <p>!null</p>
                    <a className='flex items-center gap-2 hover:underline font-semibold text-sm'
                        target='_blank'
                        href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
                        <Link2 className='rotate-45' />
                        https://www.linkedin.com/in/akash-mondal-b5a712231/
                    </a>
                </div>

                {/* stories */}
                <StoriesComponent user={userProfileData} />

                {/* followers and following */}
                <div className='flex justify-around p-2 border-y'>
                    <div className=' text-center'>
                        <p className='text-base font-semibold'>
                            {userProfileData.postCount}
                        </p>
                        <div>
                            posts
                        </div>
                    </div>

                    <Link className='cursor-pointer text-center' href={`/${userProfileData.id}/follower`}>
                        <p className='text-base font-semibold'>
                            {userProfileData.followersCount}
                        </p>
                        <div>
                            followers
                        </div>
                    </Link>

                    <Link className='cursor-pointer text-center' href={`/${userProfileData.id}/following`}>
                        <p className='text-base font-semibold'>
                            {userProfileData.followingCount}
                        </p>
                        <div>
                            following
                        </div>
                    </Link>

                </div>

            </>
            {/* posts */}
            <PostComponent posts={userProfileData.posts} />
            <div className='h-10 w-full'></div>
        </div>
    )
}

export default Sm_Device
