'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { fetchUserProfileFollowerUserApi } from '@/redux/services/profile'
import UserCardFollower from '@/components/profile/client/UserCardFollower'
import FollowPageLoading from '@/components/home/loading/FollowerLoading'


const Page = ({ params }: { params: { profile: string } }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const profile = useSelector((state: RootState) => state.profile)
    const session = useSession().data?.user
    const isProfile = useMemo(() => session?.username === params.profile, [profile, params.profile])
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
                       itself={session?.id === user.id} />)}
                    {profile.followerListLoading ?
                       <FollowPageLoading/>: <></>}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default Page