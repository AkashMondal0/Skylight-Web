/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const NotificationPing = memo(function NotificationPing() {
    const notifications = useSelector((state: RootState) => state.notification)


    return (
        <>
            {/* sm */}
            <div className="relative w-0 h-0">
                <span className="w-6 h-6 flex md:hidden">
                    <div className="relative bottom-2 left-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75">
                        </span>
                        {notifications.unreadChatCount > 0 ? <span className="rounded-full h-6 w-6
                         border-2 border-background
                        bg-red-500 text-sm flex justify-center items-center text-white">
                            {notifications.unreadChatCount}
                        </span> : <></>}
                    </div>
                </span>
            </div>
            {/* lg */}
            <div className="w-0 relative bottom-2 right-5">
                <span className="w-6 h-6 md:flex hidden">
                    <div className="relative">
                        <span className="animate-ping absolute inline-flex h-full w-full
                        rounded-full bg-red-500 opacity-75">
                        </span>
                        {notifications.unreadChatCount > 0 ? <span className="rounded-full h-6 w-6 bg-red-500 text-sm 
                         border-2 border-background
                        flex justify-center items-center text-white">
                            {notifications.unreadChatCount}
                        </span> : <></>}
                    </div>
                </span>
            </div>
        </>
    );
}, (() => true))

export default NotificationPing;