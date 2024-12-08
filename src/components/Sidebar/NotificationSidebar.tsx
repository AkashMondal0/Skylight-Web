/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from '@/lib/utils';
import React, { useCallback, useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationItem } from '../Card/NotificationItem';
import { Cancel } from '../sky/icons';
import { LoadingUserCardWithButton } from '../loading/Card';
import { RootState } from '@/redux-stores/store';
import { fetchAccountNotificationApi } from '@/redux-stores/slice/notification/api.service';
import { disPatchResponse } from '@/types';
import { resetNotificationState } from '@/redux-stores/slice/notification';
let totalFetchedItemCount = 0


const NotificationSidebar = ({
    open,
    close
}: {
    open: boolean
    close: () => void
}) => {
    const allNotifications = useSelector((state: RootState) => state.NotificationState)
    const dispatch = useDispatch()
    const stopRef = React.useRef(false)

    const fetchApi = useCallback(async () => {
        if (stopRef.current || totalFetchedItemCount === -1) return
        stopRef.current = true
        try {
            const res = await dispatch(fetchAccountNotificationApi({
                limit: 12,
                offset: totalFetchedItemCount,
            }) as any) as disPatchResponse<Notification[]>
            if (res.payload.length >= 12) {
                totalFetchedItemCount += res.payload.length
                return
            }
            totalFetchedItemCount = -1
        } finally { stopRef.current = false }
    }, [])

    const onEndReached = useCallback(() => {
        if (stopRef.current || totalFetchedItemCount < 10) return
        fetchApi()
    }, [])

    const onRefresh = useCallback(() => {
        totalFetchedItemCount = 0
        dispatch(resetNotificationState())
        fetchApi()
    }, [])

    useEffect(() => {
        if (open) {
            onRefresh()
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
                            {allNotifications.loading === "normal" ? allNotifications.notifications.map((data, i) => (
                                <NotificationItem key={i} data={data} />
                            )) : Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationSidebar;