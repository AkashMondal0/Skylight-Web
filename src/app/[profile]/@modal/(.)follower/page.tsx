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
import { fetchUserProfileFollowerUserApi } from '@/redux/services/profile'
import UserCardFollower from '@/components/profile/client/UserCardFollower'


const Page = ({ params }: { params: { profile: string } }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const profile = useSelector((state: RootState) => state.profile)
    const session = useSession().data?.user
    const isProfile = useMemo(() => profile?.state?.username === params.profile, [profile, params.profile])
    const loadedRef = useRef(false)


    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(fetchUserProfileFollowerUserApi({
                username: params.profile,
                offset: 0,
                limit: 10
            }) as any)
            loadedRef.current = true;
        }
    }, []);


    const pageRedirect = (user: User) => {
        router.push(`/${user?.username}`)
    }




    const handleActionUnFollow = async (user: User) => {
        // if (profile?.id) {
        //     await dispatch(UserUnFollowingApi({
        //         followingUserId: profile.id,
        //         followerUserId: user.id,
        //         isProfile: isProfile as boolean,
        //         type: "followers",
        //         userId: user.id
        //     }) as any)
        //     /// remove from list
        // }
    }

    const handleActionFollow = (user: User) => {
        // if (profile?.id) {
        //     dispatch(UserFollowingApi({
        //         followingUserId: user.id,
        //         followingUsername: user.username,
        //         followerUserId: profile.id,
        //         followerUsername: profile.username,
        //         isProfile: isProfile as boolean,
        //         type: "followers",
        //         userId: user.id
        //     }) as any)
        // }
    }


    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            router.back()
        }
    }
    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[425px] pb-0">
                <h1 className="text-center font-semibold text-lg">Followers</h1>
                <Separator />
                <ScrollArea className="h-72 w-full rounded-md">
                    {profile.followerList.map((user, i) => <UserCardFollower
                       key={i} user={user}
                       isProfile={isProfile}
                       itself={session?.id === user.id}
                       pageRedirect={pageRedirect}
                       handleActionFollow={handleActionFollow}
                       handleActionUnFollow={handleActionUnFollow} />)}
                    {profile.followerListLoading ?
                        <div className='space-y-2'>
                            {Array(10).fill(0).map((_, i) => <SkeletonFollowUserCard key={i} />)}
                        </div> : <></>}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default Page