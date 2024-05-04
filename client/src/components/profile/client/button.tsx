"use client"
import { Button } from "@/components/ui/button"
import { User } from "@/types"
import { Settings } from "lucide-react"
import { useRouter } from "next/navigation"

const ActionButtonsLg = ({
    isProfile,
    user,
    isFollowing,
}: {
    isProfile?: boolean
    user: User
    isFollowing?: boolean
}) => {
    const router = useRouter()
    const handleFollow = async () => {
        // if (userProfileData?.id && profile.user?.id) {
        //     await dispatch(UserFollowingApi({
        //         followingUserId: userProfileData?.id,
        //         followerUserId: profile.user?.id,
        //         isProfile: isProfile as boolean,
        //         type: null
        //     }) as any)
        // }
    }

    const handleUnfollow = async () => {
        // if (userProfileData?.id && profile.user?.id) {
        //     await dispatch(UserUnFollowingApi({
        //         followingUserId: userProfileData?.id,
        //         followerUserId: profile.user?.id,
        //         isProfile: isProfile as boolean,
        //         type: null
        //     }) as any)
        // }
    }

    if (isProfile) {
        return <div className='flex justify-between gap-2 items-center'>
            <p className='text-xl px-3'>{user.username}</p>
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
            <Settings className='w-8 h-8 cursor-pointer' />
        </div>
    }
    return <div className='flex justify-between gap-2 items-center'>
        <p className='text-xl px-3'>{user.username}</p>
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
    const handleFollow = async () => {
        // if (userProfileData?.id && profile.user?.id) {
        //     await dispatch(UserFollowingApi({
        //         followingUserId: userProfileData?.id,
        //         followerUserId: profile.user?.id,
        //         isProfile: isProfile as boolean,
        //         type: null
        //     }) as any)
        // }
    }

    const handleUnfollow = async () => {
        // if (userProfileData?.id && profile.user?.id) {
        //     await dispatch(UserUnFollowingApi({
        //         followingUserId: userProfileData?.id,
        //         followerUserId: profile.user?.id,
        //         isProfile: isProfile as boolean,
        //         type: null
        //     }) as any)
        // }
    }

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