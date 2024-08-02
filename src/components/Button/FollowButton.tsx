"use client"
import { Button } from "@/components/ui/button"
import { createFriendshipApi, destroyFriendshipApi } from "@/redux/services/profile"
import { User, disPatchResponse } from "@/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { EllipsisVertical } from "../sky/icons"
import { followUser, unFollowUser } from "@/redux/slice/profile"
import { toast } from "sonner"

const FollowButton = ({
    user,
    isFollowing,
}: {
    user: User
    isFollowing?: boolean | null
}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const isProfile = useMemo(() => session?.username === user?.username, [session?.username, user.username])
    const [loading, setLoading] = useState(false)

    const handleFollow = async () => {
        setLoading(true)
        try {
            if (!session?.id) return toast('User login issue')
            if (!user?.id) return toast('User login issue')
            const res = await dispatch(createFriendshipApi({
                authorUserId: session?.id,
                authorUsername: session?.username,
                followingUserId: user?.id,
                followingUsername: user?.username,
            }) as any) as disPatchResponse<any>
            if (!isProfile && res.payload) {
                dispatch(followUser())
            } else {
                toast("Something's went Wrong")
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleUnFollow = async () => {
        setLoading(true)
        if (!session?.id) return alert('no user id from unfollow button')
        if (!user?.id) return alert('no user id from unfollow button')
        const res = await dispatch(destroyFriendshipApi({
            authorUserId: session?.id,
            authorUsername: session?.username,
            followingUserId: user?.id,
            followingUsername: user?.username
        }) as any) as disPatchResponse<any>
        if (!isProfile && res.payload) {
            dispatch(unFollowUser())
        } else {
            alert("Something's went Wrong")
        }
        setLoading(false)
    }

    if (!user) return <div></div>


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
}
export default FollowButton
