import SkyAvatar from '@/components/sky/SkyAvatar'
import { Button } from '@/components/ui/button'
import { AuthorData, User } from '@/types'
import React from 'react'

const UserCardLikedView = ({
    user,
    isProfile
}: {
    user?: AuthorData
    isProfile?: boolean
}) => {
    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center'>
                    <SkyAvatar url={user?.profilePicture || "/user.jpg"}
                        className='h-12 w-12 mx-auto ' />
                    <div>
                        <div className='font-semibold text-base'>{user?.username}</div>
                        <div className='text-sm'>
                            {user?.email}
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    {isProfile || user?.isFollowing ? <></> :
                        <Button variant={"default"} className=" rounded-xl">
                            follow
                        </Button>}
                </div>
            </div>
        </>
    )
}

export default UserCardLikedView
