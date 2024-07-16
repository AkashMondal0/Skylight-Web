import React, { useState } from "react"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { Button } from "@/components/ui/button"
import { AuthorData } from "@/types"
import { FollowerRemoveDialog } from "../dialog/remove.follower"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { createFriendshipApi, destroyFriendshipApi } from "@/redux/services/profile"
import { UnFollowDialog } from "../dialog/unfollow"
import { followUser, unFollowUser ,removeFollower} from "@/redux/slice/profile"

const UserCardFollower = ({
    user,
    isProfile,
    itself
}: {
    user: AuthorData
    isProfile?: boolean
    itself?: boolean
}) => {
    const router = useRouter()
    const session = useSession().data?.user
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const pageNavigate = (user: AuthorData) => {
        router.push(`/${user?.username}`)
    }

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
        if (!itself) {
            dispatch(unFollowUser({ userId: user.id, side: "follower" }))
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
        if (!itself) {
            dispatch(followUser({ userId: user.id, side: "follower" }))
        }
        setLoading(false)
    }
    const handleRemoveFollow = async () => {
        setLoading(true)
        if (!session?.id) return alert('no user id from follow button')
        if (!user?.id) return alert('no user id from follow button')
        await dispatch(destroyFriendshipApi({
            authorUserId: user?.id,
            authorUsername: user?.username,
            followingUserId: session?.id,
            followingUsername: session?.username,
            sessionId: session?.id,
            updateCount: false
        }) as any)
        if (!itself && isProfile) {
            dispatch(removeFollower({ userId: user.id}))
        }
        setLoading(false)
    }
    const HandleRejected = () => { }

    if (!user) return null
    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center cursor-pointer' onClick={() => pageNavigate(user)}>
                    <SkyAvatar url={user.profilePicture || "/user.jpg"} className='h-10 w-10 mx-auto' />
                    <div>
                        <div className='font-semibold text-base'>
                            {user.username}
                        </div>
                        <div className='text-sm'>
                            {user.name}
                        </div>
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    {isProfile ? <>
                        {itself ? <p className="text-sm">You</p> : <>
                            {/* if your not following this user */}
                            {!user.following &&
                                <Button variant={"link"}
                                    onClick={handleFollow}
                                    disabled={loading}
                                    className="rounded-xl
                                    hover:text-white
                                    hover:no-underline
                                    text-blue-500">
                                    Follow
                                </Button>}
                            {/* if user following you */}
                            {user.followed_by &&
                                <FollowerRemoveDialog
                                    user={user}
                                    HandleRejected={HandleRejected}
                                    HandleConfirm={handleRemoveFollow}>
                                    <Button variant={"secondary"} className="rounded-xl">
                                        Remove
                                    </Button>
                                </FollowerRemoveDialog>}
                        </>}
                    </> : <>
                        {
                            itself ? <p className="text-sm">You</p> : <>
                                {user.following ?
                                    <UnFollowDialog
                                        user={user}
                                        HandleRejected={HandleRejected}
                                        HandleConfirm={handleUnFollow}>
                                        <Button variant={"secondary"} className="rounded-xl">
                                            Following
                                        </Button>
                                    </UnFollowDialog>
                                    :
                                    <Button onClick={handleFollow}
                                        disabled={loading} variant={"default"}
                                        className="rounded-xl">
                                        Follow
                                    </Button>}
                            </>
                        }
                    </>}
                </div>
            </div>
        </>
    )
}

export default UserCardFollower