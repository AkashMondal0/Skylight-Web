import SkyAvatar from '@/components/sky/SkyAvatar'
import { Button } from '@/components/ui/button'
import { RemoveFriendshipApi, createFriendshipApi, destroyFriendshipApi } from '@/redux/services/profile'
import { AuthorData } from '@/types'
import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FollowerRemoveDialog, UnFollowDialog } from '@/components/Dialog/Follow.Dialog'
import { useParams, useRouter } from 'next/navigation'

export const UserItemFollow = ({
    user,
    showRemoveButton = false
}: {
    user?: AuthorData
    showRemoveButton?: boolean
}) => {
    const session = useSession().data?.user
    const dispatch = useDispatch()
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(user)
    const [removed, setRemoved] = useState(false)
    const isProfile = useMemo(() => {
        return session?.id === user?.id
    }, [user?.id])

    const handleUnFollow = async () => {
        setLoading(true)
        if (!session?.id) return alert('no user id from unfollow button')
        if (!user?.id) return alert('no user id from unfollow button')
        await dispatch(destroyFriendshipApi({
            authorUserId: session?.id,
            authorUsername: session?.username,
            followingUserId: user?.id,
            followingUsername: user?.username
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
        }) as any)
        if (userData) {
            setUserData({
                ...userData,
                following: true
            })
            setRemoved(true)
        }
        setLoading(false)
    }

    const handleRemoveFollow = async () => {
        setLoading(true)
        if (!session?.id) return alert('no user id from follow button')
        if (!user?.id) return alert('no user id from follow button')
        await dispatch(RemoveFriendshipApi({
            authorUserId: user?.id,
            authorUsername: user?.username,
            followingUserId: session?.id,
            followingUsername: session?.username
        }) as any)
        setLoading(false)
    }

    const HandleRejected = () => { }
    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center cursor-pointer' onClick={() => { router.push(`/${user?.username}`) }}>
                    <SkyAvatar url={user?.profilePicture || "/user.jpg"}
                        className='h-12 w-12 mx-auto ' />
                    <div>
                        <div className='font-semibold text-base'>{user?.username}</div>
                        <div className='text-sm'>
                            {user?.email}
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    {isProfile ? <>You</> :
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
                        </>}
                    {!removed && showRemoveButton && userData?.followed_by && params.profile === session?.username &&
                        <FollowerRemoveDialog
                            user={userData}
                            HandleRejected={HandleRejected}
                            HandleConfirm={handleRemoveFollow}>
                            <Button variant={"destructive"} className="rounded-xl">
                                Remove
                            </Button>
                        </FollowerRemoveDialog>}
                </div>
            </div>
        </>
    )
}
