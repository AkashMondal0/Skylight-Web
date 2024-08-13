/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import SkyAvatar from '../sky/SkyAvatar'
import OptimizedImage from '../sky/SkyImage'
import { cn } from '@/lib/utils'
import { Notification, NotificationType } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchAccountNotificationApi } from '@/redux/services/notification'
import { timeAgoFormat } from '@/lib/timeFormat'
import { useRouter } from 'next/navigation'

const NotificationModel = ({ children }: { children: React.ReactNode }) => {
    const allNotifications = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAccountNotificationApi() as any)
    }, [])

    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='w-96 h-[100dvh] overflow-y-auto hideScrollbar scroll-smooth'>
                <div className='w-full mb-4 border-b p-4'>
                    <h2 className='text-2xl font-semibold'>Notification</h2>
                </div>
                <h2 className='w-full text-xl font-semibold px-4'>Today</h2>
                <div className='w-full pt-4 h-full min-h-dvh'>
                    {allNotifications.notifications.map((data, i) => (
                        <NotificationItem key={i} data={data} />
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default NotificationModel

export const NotificationItem = ({
    data
}: {
    data?: Notification
}) => {
    const router = useRouter()
    const navigate = () => {
        router.push(`/post/p/${data?.post?.id}`)
    }

    const Description = (type?: NotificationType) => {
        switch (type) {
            case NotificationType.Like:
                return 'liked your post'
            case NotificationType.Comment:
                return `commented on your post: ${data?.comment?.content}`
            case NotificationType.Follow:
                return 'followed you'
            default:
                return ''
        }
    }

    return (
        <div className='flex cursor-pointer p-3 justify-between transition-colors duration-300 ease-in-out
            hover:bg-accent hover:text-accent-foreground'>
            <div className='flex space-x-2 items-center cursor-pointer justify-between w-full'>
                <div className="flex-none" onClick={() => {
                    router.push(`/${data?.author?.username}`)
                }}>
                    <SkyAvatar url={data?.author?.profilePicture} className='h-12 w-12 mx-auto' />
                </div>
                <div className="grow leading-none">
                    <p className="break-all text-base font-light leading-none" onClick={() => {
                        router.push(`/${data?.author?.username}`)
                    }}>
                        <span className='font-semibold text-sm mr-1 break-words'>
                            {data?.author?.username}
                        </span>
                        <span className='break-words'>{Description(data?.type)}</span>
                    </p>
                    <span className='text-sm leading-none'>
                        {timeAgoFormat(data?.createdAt)}
                    </span>
                </div>

                <div onClick={navigate}
                    className='flex items-center flex-col flex-none h-12 w-12'>
                    <OptimizedImage
                        src={data?.post?.fileUrl[0]}
                        width={50}
                        height={50}
                        hideErrorLabel
                        showErrorIcon
                        alt="Picture of the author"
                        sizes={"(min-width: 808px) 20vw, 30vw"}
                        fetchPriority="high"
                        className={cn(`h-12 w-12 
                        cursor-pointer rounded-xl userNotSelectImg bg-muted object-cover p-0`)} />
                </div>
            </div>
        </div>
    )
}