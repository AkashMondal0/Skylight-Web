import { User } from '@/types'
import React from 'react'
import { ActionButtonsLg } from './client/button'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import Dynamic from 'next/dynamic'
import { Skeleton } from '../ui/skeleton'

const StoriesComponent = Dynamic(() => import('./Stories'), {
    loading: () => <div className='flex gap-10 m-5 my-10'>
        <Skeleton className='w-20 h-20 rounded-full' />
    </div>
})
const PostComponent = Dynamic(() => import('./Post'), {
    loading: () => <div className="grid grid-cols-3 gap-2 p-1">
        {Array(9).fill(0).map((post, index) => (
            <Skeleton key={index} className='aspect-square w-full h-full object-cover' />
        ))}
    </div>
})


interface Props {
    isProfile: boolean
    user: User
}
const Lg_Device = ({
    isProfile,
    user: userProfileData,
}: Props) => {
    return (
        <div className="hidden sm:block">
            {/* profile header */}
            <div className='flex items-center my-8 m-5'>
                {/* {isProfile ?
                    <OptionAvatarDialog profile={user as any}>
                        <Image src={userProfileData.profilePicture || "/user.jpg"}
                            alt='profile'
                            className='sm:w-36 object-cover bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8 cursor-pointer' />
                    </OptionAvatarDialog> : */}
                <img src={userProfileData.profilePicture || "/user.jpg"}
                    alt='profile'
                    className='sm:w-36 object-cover bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8 cursor-pointer' />
                {/* } */}
                <div className='flex flex-col justify-between gap-5'>
                    <ActionButtonsLg
                        isFollowing={userProfileData.isFollowing}
                        user={userProfileData}
                        isProfile={isProfile} />
                    <div className='flex justify-between px-3'>
                        <div className='flex gap-1'>
                            <p className='text-base font-semibold'>
                                {userProfileData.postCount}
                            </p> posts
                        </div>
                        <Link href={`/${userProfileData.email}/followers`} className='sm:cursor-pointer flex gap-1'>
                            <p className='text-base font-semibold'>
                                {userProfileData.followersCount}
                            </p>
                            followers
                        </Link>
                        <Link href={`/${userProfileData.email}/following`} className='sm:cursor-pointer flex gap-1'>
                            <p className='text-base font-semibold'>
                                {userProfileData.followingCount}
                            </p>
                            following
                        </Link>
                    </div>

                    <div className='flex justify-between flex-col px-3 my-4'>
                        <p className='font-semibold'>{userProfileData.username}</p>
                        <p>!null</p>
                        <a className='flex items-center gap-2 hover:underline font-semibold text-sm'
                            target='_blank'
                            href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
                            <Link2 className='rotate-45' />
                            https://www.linkedin.com/in/akash-mondal-b5a712231/
                        </a>
                    </div>
                </div>
            </div>
            {/* story */}
            <StoriesComponent user={userProfileData} />
            {/* post */}
            <PostComponent posts={userProfileData.posts} />
            <div className='h-10 w-full'></div>
        </div>
    )
}

export default Lg_Device
