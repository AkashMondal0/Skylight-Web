"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { createFriendshipApi, destroyFriendshipApi } from "@/redux/services/profile"
import { RootState } from "@/redux/store"
import { User } from "@/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EllipsisVertical } from "../sky/icons"

const FollowButton = memo(function FollowAndUnFollowButton({
    isProfile,
    user,
    isFollowing,
}: {
    isProfile?: boolean
    user: User
    isFollowing?: boolean
}) {
    const loading = useSelector((Root: RootState) => Root.profile.friendShipLoading)
    const router = useRouter()
    const dispatch = useDispatch()
    const session = useSession().data?.user

    const handleFollow = async () => {
        if (!session?.id) return alert('no user id from follow button')
        if (!user?.id) return alert('no user id from follow button')
        await dispatch(createFriendshipApi({
            authorUserId: session?.id,
            authorUsername: session?.username,
            followingUserId: user?.id,
            followingUsername: user?.username,
            sessionId:session?.id,
            updateCount:true
        }) as any)
    }

    const handleUnFollow = async () => {
        if (!session?.id) return alert('no user id from unfollow button')
        if (!user?.id) return alert('no user id from unfollow button')
        await dispatch(destroyFriendshipApi({
            authorUserId: session?.id,
            authorUsername: session?.username,
            followingUserId: user?.id,
            followingUsername: user?.username,
            sessionId:session?.id,
            updateCount:true
        }) as any)
    }

    if (!user) return <div className='flex justify-between gap-2 items-center'>
        <Skeleton className='w-32 h-6 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-8 h-8 rounded-xl' />
    </div>


    if (isProfile) {
        return <div className='sm:flex space-x-2 space-y-2 items-center'>
            <div className="flex items-center">
                <p className='text-xl px-3 truncate w-32'>{user.username}</p>
            </div>

            <Button variant={"secondary"} disabled={loading} className='rounded-xl' onClick={() => {
                router.push('/account/edit')
            }}>
                Edit Profile
            </Button>
            <Button variant={"secondary"} disabled={loading} className='rounded-xl' onClick={() => {
                router.push('/account/archive')
            }}>
                View Archive
            </Button>
            {EllipsisVertical('w-6 h-6 cursor-pointer hidden sm:block')}
        </div>
    }

    return <div className='items-center sm:flex space-x-2 space-y-2'>
        <p className='text-xl px-3 truncate w-32'>{user.username}</p>
        {isFollowing ?
            <Button className='rounded-xl px-6 w-24' variant={"secondary"} disabled={loading} onClick={handleUnFollow}>
                Following
            </Button> :
            <Button className='rounded-xl px-6 w-24' disabled={loading} onClick={handleFollow}>
                Follow
            </Button>
        }
        <Button variant={"secondary"} className='rounded-xl' disabled={loading} onClick={() => {
            router.push('/account/archive')
        }}>
            Message
        </Button>
        {EllipsisVertical('w-6 h-6 cursor-pointer hidden sm:block')}
    </div>
})
export default FollowButton
