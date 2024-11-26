/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { NotificationItem } from "@/components/Card/NotificationItem";
import { LoadingUserCardWithButton } from "@/components/loading/Card";
import { fetchAccountNotificationApi } from "@/redux-stores/slice/notification/api.service";
import { RootState } from "@/redux-stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const allNotifications = useSelector((state: RootState) => state.NotificationState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccountNotificationApi({
      limit: 10,
      offset: 0
    }) as any)
  }, [])

  return <div className="mx-auto max-w-[600px] w-full">
    <div className='w-full mb-4 border-b p-4'>
      <h2 className='text-2xl font-semibold'>Notification</h2>
    </div>
    <h2 className='w-full text-xl font-semibold px-4'>Today</h2>
    <div className='w-full pt-4 h-full min-h-dvh px-2 space-y-2'>
      {
        allNotifications.loading ? Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)
          :
          allNotifications.notifications.map((data, i) => (
            <NotificationItem key={i} data={data} />
          ))
      }
    </div>
  </div>
}