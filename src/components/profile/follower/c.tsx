'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { User } from '@/types'
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RootState } from '@/redux/store'
import { UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions'
// import { followersDataClear, setFollowersUsers } from '@/redux/slice/users'
import { SkeletonFollowUserCard } from '@/components/profile/loading/skeleton'
import { useSession } from 'next-auth/react'
import UserCard from './UserCard'



const ModalFollower = ({
    profileId
}: { profileId: string }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const users = useSelector((state: RootState) => state.users)
    const profile = useSession().data?.user
    const isProfile = useMemo(() => profile?.username === profileId, [profile?.username, profileId])
    const loadedRef = useRef(false)

    const pageRedirect = (user: User) => {
        router.push(`/${user?.username}`)
    }

    useEffect(() => {
        if (!loadedRef.current) {
            // dispatch(setFollowersUsers({
            //     Users: data,
            //     skip: 0,
            //     size: 12
            // }) as any)
            loadedRef.current = true;
        }
    }, [dispatch]);


    const handleActionUnFollow = async (user: User) => {
        if (profile?.id) {
            await dispatch(UserUnFollowingApi({
                followingUserId: profile.id,
                followerUserId: user.id,
                isProfile: isProfile as boolean,
                type: "followers",
                userId: user.id
            }) as any)
            /// remove from list
        }
    }

    const handleActionFollow = (user: User) => {
        if (profile?.id) {
            dispatch(UserFollowingApi({
                followingUserId: user.id,
                followingUsername: user.username,
                followerUserId: profile.id,
                followerUsername: profile.username,
                isProfile: isProfile as boolean,
                type: "followers",
                userId: user.id
            }) as any)
        }
    }


    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            // dispatch(followersDataClear())
            router.back()
        }
    }
    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[425px] pb-0">
                <h1 className="text-center font-semibold text-lg">Followers</h1>
                <Separator />
                <ScrollArea className="h-72 w-full rounded-md">
                    {/* {users.profileData.fetchFollow.followers.map((user, i) => <UserCard
                        pageRedirect={pageRedirect}
                        key={i} user={user}
                        isProfile={isProfile}
                        handleActionFollow={handleActionFollow}
                        itself={profile?.id === user.id}
                        handleActionUnFollow={handleActionUnFollow} />)}
                    {users.profileData.fetchFollow.loading ? <div className='space-y-2'>
                        {Array(10).fill(0).map((_, i) => <SkeletonFollowUserCard key={i} />)}
                    </div> : <></>} */}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default ModalFollower



