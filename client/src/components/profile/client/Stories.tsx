/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { User } from '@/types'
import { Plus } from 'lucide-react'
import React from 'react'

const StoriesComponent = ({
    user
}: {
    user: User
}) => {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    return (
        <div className='flex sm:gap-10 m-5 sm:my-10 gap-5 my-5 px-2'>
            <img src={user.profilePicture || '/user.jpg'}
                className='sm:w-20 sm:h-20 rounded-full object-cover cursor-pointer h-16 w-16' />
            <div className='sm:w-20 sm:h-20 w-16 h-16 border-[2px] rounded-full flex justify-center items-center cursor-pointer'>
                <Plus className='sm:w-16 sm:h-16 w-10 h-10' />
            </div>
        </div>
    )
}

export default StoriesComponent
