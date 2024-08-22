"use client"
import { Button } from "@/components/ui/button"
import { createFriendshipApi, destroyFriendshipApi } from "@/redux/services/profile"
import { User, disPatchResponse } from "@/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { memo, useRef } from "react"
import { useDispatch } from "react-redux"
import { EllipsisVertical } from "../sky/icons"
import { followUser, unFollowUser } from "@/redux/slice/profile"
import { toast } from "sonner"

const ProfileFollowButton = memo(function FollowButton({
    user,
    isFollowing,
    isProfile
}: {
    user: User
    isFollowing?: boolean | null
    isProfile: boolean
}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const loadingRef = useRef(false)

    const handleFollow = async () => {
        if (loadingRef.current) return
        loadingRef.current = true
        try {
            if (!session?.id) return toast('You are not logged in')
            if (!user?.id) return toast('User id issue')
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
            loadingRef.current = false
        }
    }

    const handleUnFollow = async () => {
        if (loadingRef.current) return
        loadingRef.current = true
        try {
            if (!session?.id) return alert('You are not logged in')
            if (!user?.id) return alert('User login issue')
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
        } finally {
            loadingRef.current = false
        }
    }

    if (!user) return <div></div>


    if (isProfile) {
        return <div className='md:flex space-x-2 space-y-2 items-center'>
            <div className="flex items-center">
                <p className='text-xl px-3 line-clamp-1'>{user.username}</p>
            </div>

            <Button variant={"secondary"} disabled={loadingRef.current} className='rounded-xl' onClick={() => {
                router.push('/account/edit')
            }}>
                Edit Profile
            </Button>
            <Button variant={"secondary"} disabled={loadingRef.current} className='rounded-xl' onClick={() => {
                router.push('/account/archive')
            }}>
                View Archive
            </Button>
            <div className="w-7 h-7 cursor-pointer hidden md:block">
                {EllipsisVertical('w-full h-full')}
            </div>
        </div>
    }

    return <div className='items-center md:flex space-x-2 space-y-2'>
        <div className="flex items-center">
            <p className='text-xl px-3 line-clamp-1'>{user.username}</p>
        </div>
        {isFollowing ?
            <Button className='rounded-xl px-6 w-24' variant={"secondary"} disabled={loadingRef.current} onClick={handleUnFollow}>
                Following
            </Button> :
            <Button className='rounded-xl px-6 w-24' disabled={loadingRef.current} onClick={handleFollow}>
                Follow
            </Button>
        }
        <Button variant={"secondary"} className='rounded-xl' disabled={loadingRef.current} onClick={() => {
            router.push('/account/archive')
        }}>
            Message
        </Button>
        <div className="w-7 h-7 cursor-pointer hidden md:block">
            {EllipsisVertical('w-full h-full')}
        </div>
    </div>
}, ((prevProps: any, nextProps: any) => prevProps.isProfile === nextProps.isProfile
    && prevProps.isFollowing === nextProps.isFollowing
    && prevProps.user.id === nextProps.user.id))
export default ProfileFollowButton
