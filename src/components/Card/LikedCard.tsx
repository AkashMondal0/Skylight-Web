import { UnFollowDialog } from '@/components/Dialog/unfollow'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { Button } from '@/components/ui/button'
import { createFriendshipApi, destroyFriendshipApi } from '@/redux/services/profile'
import { AuthorData } from '@/types'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const UserCardLikedView = ({
    user,
    isProfile
}: {
    user?: AuthorData
    isProfile?: boolean
}) => {
    const session = useSession().data?.user
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(user)

    const handleUnFollow = async () => {
        setLoading(true)
        if (!session?.id) return alert('no user id from unfollow button')
        if (!user?.id) return alert('no user id from unfollow button')
        await dispatch(destroyFriendshipApi({
            authorUserId: session?.id,
            authorUsername: session?.username,
            followingUserId: user?.id,
            followingUsername: user?.username,
            sessionId: session?.id,
            updateCount: false
        }) as any)
        if (userData) {
            setUserData({
                ...userData,
                following: false
            })
        }
        setLoading(false)
    }

    const handleFollow = async () => {
        setLoading(true)
        if (!session?.id) return alert('no user id from follow button')
        if (!user?.id) return alert('no user id from follow button')
        await dispatch(createFriendshipApi({
            authorUserId: session?.id,
            authorUsername: session?.username,
            followingUserId: user?.id,
            followingUsername: user?.username,
            sessionId: session?.id,
            updateCount: false
        }) as any)
        if (userData) {
            setUserData({
                ...userData,
                following: true
            })
        }
        setLoading(false)
    }

    const HandleRejected = () => { }

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
                    {
                        session?.id === user?.id ? <>You</> :
                            <>
                                {userData?.following ?
                                    <UnFollowDialog
                                        HandleConfirm={handleUnFollow}
                                        HandleRejected={HandleRejected}
                                        user={userData}>
                                        <Button
                                            disabled={loading}
                                            variant={"secondary"} className=" rounded-xl">
                                            following
                                        </Button>
                                    </UnFollowDialog>
                                    :
                                    <Button
                                        disabled={loading}
                                        onClick={handleFollow}
                                        variant={"default"} className=" rounded-xl">
                                        follow
                                    </Button>}
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default UserCardLikedView
