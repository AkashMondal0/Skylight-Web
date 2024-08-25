import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const NotificationIndicator = memo(function NotificationIndicator() {
    const notifications = useSelector((state: RootState) => state.notification)


    return (
        <>
            {/* sm */}
            <div className="w-0 relative left-5 top-3 flex md:hidden">
                <span className="w-3 h-3 flex">
                    <div className="relative">
                        <span className="animate-ping absolute inline-flex h-full w-full
                        rounded-full bg-red-500 opacity-75">
                        </span>
                        {notifications.unreadCommentCount > 0 || notifications.unreadPostLikeCount > 0 ?
                            <span className="rounded-full h-3 w-3 bg-red-500 text-sm 
                         border-2 border-background
                        flex justify-center items-center">
                            </span> : <></>}
                    </div>
                </span>
            </div>
            {/* lg */}
            <div className="w-0 relative right-3 md:flex hidden">
                <span className="w-3 h-3 flex">
                    <div className="relative">
                        <span className="animate-ping absolute inline-flex h-full w-full
                        rounded-full bg-red-500 opacity-75">
                        </span>
                        {notifications.unreadCommentCount > 0 || notifications.unreadPostLikeCount > 0 ?
                            <span className="rounded-full h-3 w-3 bg-red-500 text-sm 
                         border-2 border-background
                        flex justify-center items-center">
                            </span> : <></>}
                    </div>
                </span>
            </div>
        </>
    );
}, (() => true))

export default NotificationIndicator;