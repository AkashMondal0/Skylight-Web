import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types'
import Link from 'next/link'
import React from 'react'

const ExploreSuggestion = ({
}: {
    }) => {
    const user = null
    if (!user) return null
    return (
        <div className='my-4 space-y-4'>
            <MyAccount user={user!} />
            <div className='flex justify-between px-2 max-w-sm w-72'>
                <div className='font-semibold text-sm'>Suggestion for you</div>
                <Link href={"/explore/people"} className='font-semibold text-xs hover:opacity-50 cursor-pointer'>See All</Link>
            </div>
            <div className='space-y-3'>
                {[...Array(5)].map((_, i) => <ExploreUserCard key={i} />)}
            </div>
        </div>
    )
}

export default ExploreSuggestion

const ExploreUserCard = ({
    url = "/user.jpg",
}: {
    url?: string
}) => {
    return (
        <div>
            <div className='flex justify-between px-2 max-w-sm w-72'>
                <div className='flex space-x-2 items-center'>
                    <Avatar className='h-10 w-10 mx-auto'>
                        <AvatarImage src={url}
                            alt="@shadcn" className='rounded-full' />
                    </Avatar>
                    <div>
                        <div className='font-semibold text-base'>Akash Mondal</div>
                        <div className='text-sm'>
                            suggested for you
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <Link href={"/explore/people"}
                        className='text-sm text-blue-500 hover:text-white cursor-pointer hover:opacity-90'>
                        Follow
                    </Link>
                </div>
            </div>
        </div>
    )
}

const MyAccount = ({
    user
}: {
    user: User
}) => {
    return <div>
        <div className='flex justify-between px-2 max-w-sm w-72'>
            <div className='flex space-x-2 items-center'>
                <Avatar className='h-10 w-10 mx-auto'>
                    <AvatarImage src={user?.profilePicture || "/user.jpg"}
                        alt="@shadcn" className='rounded-full' />
                </Avatar>
                <div>
                    <div className='font-semibold text-base'>{user?.email}</div>
                    <div className='text-sm'>
                        {user.username}
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <Link href={"/explore/people"} className='text-sm text-blue-500 hover:text-white cursor-pointer hover:opacity-90'>
                    Switch
                </Link>
            </div>
        </div>
    </div>
}
