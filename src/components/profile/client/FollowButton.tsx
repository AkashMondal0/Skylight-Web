"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UserFollowingApi, UserUnFollowingApi } from "@/redux/slice/users/api-functions"
import { RootState } from "@/redux/store"
import { User } from "@/types"
import { Loader2, Settings } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

const FollowAndUnFollowButton = ({
    isProfile,
    user,
    isFollowing,
}: {
    isProfile?: boolean
    user: User
    isFollowing?: boolean
}) => {
    const loading = false
    const router = useRouter()
    const dispatch = useDispatch()
    const session = useSession().data?.user

    const handleFollow = async () => {
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
    }

    const handleUnfollow = async () => {
        if (!session?.id) return alert('no user id from unfollow button')
        if (!user?.id) return alert('no user id from unfollow button')
        await dispatch(UserUnFollowingApi({
            followingUserId: user?.id,
            followerUserId: session?.id,
            isProfile: isProfile as boolean,
            type: null
        }) as any)
    }

    const handleFollowAndUnfollow = async () => {
        if (isFollowing) {
            await handleUnfollow()
        } else {
            await handleFollow()
        }
    }

    if (!user) return <div className='flex justify-between gap-2 items-center'>
        <Skeleton className='w-32 h-6 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-32 h-10 rounded-xl' />
        <Skeleton className='w-8 h-8 rounded-xl' />
    </div>


    if (isProfile) {
        return <div className='sm:flex space-x-2 space-y-2'>
            <div className="flex items-center">
                <p className='text-xl px-3 truncate w-32'>{user.username}</p>
                <Settings className='w-6 h-6 cursor-pointer sm:hidden block' />
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

        <Button className='rounded-xl px-6' disabled={loading} onClick={handleFollowAndUnfollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}{loading ? "ing..." : ""}
        </Button>

        <Button variant={"secondary"} className='rounded-xl' disabled={loading} onClick={() => {
            router.push('/account/archive')
        }}>
            Message
        </Button>
        {EllipsisVertical('w-6 h-6 cursor-pointer hidden sm:block')}
    </div>
}
export default FollowAndUnFollowButton

const EllipsisVertical = (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-ellipsis-vertical ${className}`}><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>