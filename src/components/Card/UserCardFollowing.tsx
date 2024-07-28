import SkyAvatar from "@/components/sky/SkyAvatar"
import { Button } from "@/components/ui/button"
import { AuthorData } from "@/types"
import { UnFollowDialog } from "../Dialog/unfollow"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { createFriendshipApi, destroyFriendshipApi } from "@/redux/services/profile"
import { useState } from "react"
import { followUser, unFollowUser } from "@/redux/slice/profile"


const UserCardFollowing = ({
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
            dispatch(unFollowUser({ userId: user.id, side: "following" }))
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
            dispatch(followUser({ userId: user.id, side: "following" }))
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
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    {isProfile ? <>
                        {/* if profile */}
                        {itself ? <p className="text-sm">You</p> : <>
                            {user.following ?
                                <UnFollowDialog
                                    user={user}
                                    HandleRejected={HandleRejected}
                                    HandleConfirm={handleUnFollow}>
                                    <Button variant={"secondary"}
                                        className="rounded-xl">
                                        Following  {/* UnFollow */}
                                    </Button>
                                </UnFollowDialog>
                                :
                                <Button variant={"default"}
                                    disabled={loading}
                                    onClick={handleFollow} className="rounded-xl">
                                    Follow
                                </Button>}
                        </>}
                    </> : <>
                        {
                            itself ? <p className="text-sm">You</p> : <>
                                {user.following ?
                                    <UnFollowDialog
                                        user={user}
                                        HandleRejected={HandleRejected}
                                        HandleConfirm={handleUnFollow}>
                                        <Button variant={"secondary"}
                                            className="rounded-xl">
                                            Following  {/* UnFollow */}
                                        </Button>
                                    </UnFollowDialog> :
                                    <Button variant={"default"}
                                        onClick={handleFollow}
                                        disabled={loading}
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

export default UserCardFollowing