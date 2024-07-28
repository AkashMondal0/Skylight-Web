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
import UserCardFollower from '@/components/Card/UserCardFollower'
import { LoadingUserCardWithButton } from '@/components/loading/Card'


const Page = ({ params }: { params: { profile: string } }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const profile = useSelector((Root: RootState) => Root.profile)
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
            <DialogContent className="p-0 h-[500px]">
                <div className='w-full flex justify-center min-h-[100dvh] h-full'>
                    <div className='max-w-[600px] w-full p-4'>
                        <h1 className="font-semibold text-lg text-center mb-4">Followers</h1>
                        <Separator />
                        <div className='h-5' />
                        <ScrollArea className='h-[400px]' >
                            {profile.followerListLoading || !loadedRef.current ? <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</> : <>
                                {profile.followerList?.map((user, i) => <UserCardFollower
                                    key={i} user={user}
                                    isProfile={isProfile}
                                    itself={session?.id === user.id} />)}
                            </>}
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Page