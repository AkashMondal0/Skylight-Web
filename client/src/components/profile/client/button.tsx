"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UserFollowingApi, UserUnFollowingApi } from "@/redux/slice/users/api-functions"
import { User } from "@/types"
import { Loader2, Settings } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

const ActionButtonsLg = ({
    isProfile,
    user,
    isFollowing,
}: {
    isProfile?: boolean
    user: User
    isFollowing?: boolean
}) => {
    const [disable, setDisable] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const handleFollow = async () => {
        setDisable(true)
        if (!session?.id) return alert('no user id from follow button')
        if (!user?.id) return alert('no user id from follow button')

        await dispatch(UserFollowingApi({
            followingUserId: user?.id,
            followerUserId: session?.id,
            followingUsername: user.username,
            followerUsername: session.username,
            isProfile: isProfile as boolean,
            type: null
        }) as any)
        setDisable(false)
    }

    const handleUnfollow = async () => {
        setDisable(true)
        if (!session?.id) return alert('no user id from unfollow button')
        if (!user?.id) return alert('no user id from unfollow button')

        await dispatch(UserUnFollowingApi({
            followingUserId: user?.id,
            followerUserId: session?.id,
            isProfile: isProfile as boolean,
            type: null
        }) as any)
        setDisable(false)
    }

    if (!user) return <div className='flex justify-between gap-2 items-center'>
        <Skeleton className='w-32 h-6 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-8 h-8 rounded-xl' />
    </div>


    if (isProfile) {
        return <div className='flex justify-between gap-2 items-center'>
            <p className='text-xl px-3'>{user.username}</p>
            <Button variant={"secondary"} disabled={disable} className='rounded-xl' onClick={() => {
                router.push('/account/edit')
            }}>
                Edit Profile
            </Button>
            <Button variant={"secondary"} disabled={disable} className='rounded-xl' onClick={() => {
                router.push('/account/archive')
            }}>
                View Archive
            </Button>
            <Settings className='w-8 h-8 cursor-pointer' />
        </div>
    }

    return <div className='flex justify-between gap-2 items-center'>
        <p className='text-xl px-3'>{user.username}</p>
        {isFollowing ? <Button className='rounded-xl' disabled={disable} onClick={handleUnfollow}>
            {disable ? <Loader2 className="animate-ping" /> : "Unfollow"}
        </Button> : <Button className='rounded-xl' disabled={disable} onClick={handleFollow}>
            {disable ? <Loader2 className="animate-ping" /> : "Follow"}
        </Button>}

        <Button variant={"secondary"} className='rounded-xl' disabled={disable} onClick={() => {
            router.push('/account/archive')
        }}>
            Message
        </Button>
        <Settings className='w-8 h-8 cursor-pointer' />
    </div>
}

const ActionButtonsSM = ({
    isProfile,
    isFollowing,
    user
}: {
    isProfile?: boolean
    user: User
    isFollowing?: boolean
}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const handleFollow = async () => {
        if (user?.id && session?.id) {
            await dispatch(UserFollowingApi({
                followingUserId: user?.id,
                followerUserId: session?.id,
                followingUsername: user.username,
                followerUsername: session.username,
                isProfile: isProfile as boolean,
                type: null
            }) as any)
        } else {
            console.log('no user id from follow button')
        }
    }

    const handleUnfollow = async () => {
        if (user?.id && session?.id) {
            await dispatch(UserUnFollowingApi({
                followingUserId: user?.id,
                followerUserId: session?.id,
                isProfile: isProfile as boolean,
                type: null
            }) as any)
        }
    }

    if (!user) return <div className='flex justify-between gap-2 items-center'>
        <Skeleton className='w-32 h-6 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-8 h-8 rounded-xl' />
    </div>

    if (isProfile) {
        return <div className='flex justify-between gap-2 px-3'>
            <Button variant={"secondary"} className='rounded-xl' onClick={() => {
                router.push('/account/edit')
            }}>
                Edit Profile
            </Button>
            <Button variant={"secondary"} className='rounded-xl' onClick={() => {
                router.push('/account/archive')
            }}>
                View Archive
            </Button>
        </div>
    }

    return <div className='flex justify-between gap-2 px-3'>
        {isFollowing ? <Button className='rounded-xl' onClick={handleUnfollow}>
            Unfollow
        </Button> : <Button className='rounded-xl' onClick={handleFollow}>
            Follow
        </Button>}

        <Button variant={"secondary"} className='rounded-xl' onClick={() => {
            router.push('/account/archive')
        }}>
            Message
        </Button>
    </div>
}

export { ActionButtonsLg, ActionButtonsSM }