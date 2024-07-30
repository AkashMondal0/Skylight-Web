'use client'
import React, { useEffect, useRef } from 'react'
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '@/redux/store'
import { fetchUserProfileFollowerUserApi } from '@/redux/services/profile'
import { LoadingUserCardWithButton } from '@/components/loading/Card'
import { UserItemFollow } from '@/components/Card/UserItem'
import { TempleDialog } from '@/components/Dialog/Temple.Dialog'


const Page = ({ params }: { params: { profile: string } }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const profile = useSelector((Root: RootState) => Root.profile)
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
    return (<TempleDialog
        open
        onOpenChange={onOpenChange}
        headerTitle={'Followers'}>
        {profile.followerListLoading || !loadedRef.current ?
            Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)
            : profile.followerList?.map((user, i) => <UserItemFollow showRemoveButton key={i} user={user} />)}
    </TempleDialog>)
}

export default Page