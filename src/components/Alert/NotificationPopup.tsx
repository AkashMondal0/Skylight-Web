/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setOffNotificationPopup, setOnNotificationPopup } from "@/redux/slice/notification";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
let initial = false
const NotificationPopup = memo(function NotificationPopup() {
    const notifications = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()
    const Sidebar = useSelector((state: RootState) => state.sidebarSlice)

    useEffect(() => {
        const time = setTimeout(() => {
            if (!initial) {
                if (notifications.unreadPostLikeCount > 0 || notifications.unreadCommentCount > 0) {
                    dispatch(setOnNotificationPopup())
                }
                initial = true
            }
        }, 1600)
        return () => {
            clearTimeout(time)
        }
    }, [notifications.unreadPostLikeCount, notifications.unreadCommentCount])

    useEffect(() => {
        if (notifications.notificationPopup) {
            const time = setTimeout(() => {
                dispatch(setOffNotificationPopup())
            }, 7000)
            return () => {
                clearTimeout(time)
            }
        }
    }, [notifications.notificationPopup])

    if (Sidebar.notificationSidebar) {
        return <></>
    }

    return (
        <>
            {/* sm */}
            <div className="h-auto flex md:hidden items-center flex-none flex-col">
                <div className={cn(`absolute py-2`)}>
                    <div className={cn(`w-max bg-red-500 justify-center flex flex-col items-center rounded-xl transition duration-500 ease-in-out`,
                        notifications.notificationPopup ? "" : "scale-0")}>
                        <div className={cn("h-4 w-4 bg-red-500 relative bottom-[0.3rem] rotate-45 rounded-sm")} />
                        <div className={cn("flex items-center px-2 gap-1 transition-all duration-700 ease-in-out relative bottom-2",
                            notifications.notificationPopup ? "opacity-100" : "opacity-0")}>

                            {notifications.unreadPostLikeCount > 0 ? <div className="flex gap-1 items-center">
                                <Heart className="w-5 h-5 fill-current text-white" />
                                <p className="font-semibold text-white">
                                    {notifications.unreadPostLikeCount}
                                </p>
                            </div> : <></>}

                            {notifications.unreadCommentCount > 0 ? <div className="flex gap-1 items-center">
                                <MessageCircle className="w-5 h-5 fill-current text-white" />
                                <p className="font-semibold text-white">
                                    {notifications.unreadCommentCount}
                                </p>
                            </div> : <></>}

                        </div>
                    </div>
                </div>
            </div>
            {/* lg */}
            <div className="md:flex hidden">
                <TooltipProvider>
                    <Tooltip open delayDuration={3}>
                        <TooltipTrigger asChild>
                            <div />
                        </TooltipTrigger>
                        <TooltipContent
                            side="right"
                            className="p-0 border-none bg-transparent shadow-none">
                            <div className={cn(`pl-3`)}>
                                <div className={cn(`w-max flex items-center bg-red-500 justify-center h-10 rounded-xl transition duration-500 ease-in-out`,
                                    notifications.notificationPopup ? "" : "scale-0"
                                )}>
                                    <div className={cn("h-4 w-4 bg-red-500 relative right-[0.4rem] rotate-45 rounded-sm")} />
                                    <div className={cn("flex items-center pr-2 gap-1 transition-all duration-700 ease-in-out",
                                        notifications.notificationPopup ? "opacity-100" : "opacity-0")}>

                                        {notifications.unreadPostLikeCount > 0 ? <div className="flex gap-1 items-center">
                                            <Heart className="w-5 h-5 fill-current text-white" />
                                            <p className="font-semibold text-white">
                                                {notifications.unreadPostLikeCount}
                                            </p>
                                        </div> : <></>}

                                        {notifications.unreadCommentCount > 0 ? <div className="flex gap-1 items-center">
                                            <MessageCircle className="w-5 h-5 fill-current text-white" />
                                            <p className="font-semibold text-white">
                                                {notifications.unreadCommentCount}
                                            </p>
                                        </div> : <></>}
                                    </div>
                                </div>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </>
    );
}, (() => true))

export default NotificationPopup;