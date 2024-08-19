/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountNotificationApi } from '@/redux/services/notification';
import { RootState } from '@/redux/store';
import { NotificationItem } from '../Card/NotificationItem';
import { Cancel } from '../sky/icons';
import { LoadingUserCardWithButton } from '../loading/Card';


const NotificationSidebar = ({
    open,
    close
}: {
    open: boolean
    close: () => void
}) => {
    const allNotifications = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        if (open) {
            dispatch(fetchAccountNotificationApi() as any)
        }
    }, [open])

    return (
        <div>
            <div className={cn(`flex absolute z-50 w-auto h-dvh`)}>
                <div className={cn(`flex flex-col flex-none bg-background text-foreground
                 duration-300 ease-in-out transition-all z-50`,
                    open ? 'w-96 border-x' : 'w-0')}>
                    <div className={cn('overflow-y-auto scroll-smooth hideScrollbar',
                        open ? 'block' : 'hidden')}>
                        <div className='w-full mb-4 border-b p-4 flex justify-between'>
                            <h2 className='text-2xl font-semibold'>Notification</h2>
                            <Button onClick={close}
                                variant={"outline"}
                                className='rounded-full px-2'>
                                {Cancel()}
                            </Button>
                        </div>
                        <h2 className='w-full text-xl font-semibold px-4'>Today</h2>
                        <div className='w-full pt-4 h-full min-h-dvh'>
                            {
                                allNotifications.loading ? Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)
                                    :
                                    allNotifications.notifications.map((data, i) => (
                                        <NotificationItem key={i} data={data} />
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationSidebar;