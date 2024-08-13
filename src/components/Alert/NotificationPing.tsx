/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const NotificationPing = memo(function NotificationPing() {
    const notifications = useSelector((state: RootState) => state.notification)


    return (
        <>
            {/* sm */}
            <span className="absolute w-5 h-5 flex md:hidden">
                <div className="relative bottom-2 left-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75">
                    </span>
                    {notifications.unreadChatCount > 0 ? <span className="rounded-full h-5 w-5 bg-red-500 text-sm flex justify-center items-center">
                        {notifications.unreadChatCount}
                    </span> : <></>}
                </div>
            </span>
            {/* lg */}
            <span className="absolute w-5 h-5 md:flex hidden">
                <div className="relative bottom-1 left-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75">
                    </span>
                    {notifications.unreadChatCount > 0 ? <span className="rounded-full h-5 w-5 bg-red-500 text-sm flex justify-center items-center">
                        {notifications.unreadChatCount}
                    </span> : <></>}
                </div>
            </span>
        </>
    );
}, (() => true))

export default NotificationPing;