/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setOffNotificationPopup } from "@/redux/slice/notification";

const NotificationPopup = ({
    align = "side"
}: {
    align?: "side" | "top"
}) => {
    const notifications = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        if (notifications.notificationPopup) {
            setTimeout(() => {
                dispatch(setOffNotificationPopup() as any)
            }, 14000)
        }
    }, [notifications.notificationPopup])

    if (align === "top") {
        return (
            <div className="h-auto flex items-center flex-none flex-col">
                <div className={cn(`absolute py-2`)}>
                    <div className={cn(`
                    w-max bg-red-500 justify-center flex flex-col items-center
                    rounded-xl transition duration-500 ease-in-out`,
                        notifications.notificationPopup ? "" : "scale-0"
                    )}>
                        <div className={cn("h-4 w-4 bg-red-500 relative bottom-[0.3rem] rotate-45 rounded-sm")} />
                        <div className={cn("flex items-center px-2 gap-1 transition-all duration-700 ease-in-out relative bottom-2",
                            notifications.notificationPopup ? "opacity-100" : "opacity-0")}>

                            {notifications.postNotification ? <div className="flex gap-1 items-center">
                                <Heart className="w-5 h-5 fill-current" />
                                <p className="font-semibold">
                                    {notifications.postNotification.notificationCount}
                                </p>
                            </div> : <></>}

                            {notifications.commentNotification.isNotification ? <div className="flex gap-1 items-center">
                                <MessageCircle className="w-5 h-5 fill-current" />
                                <p className="font-semibold">
                                    {notifications.commentNotification.notificationCount}
                                </p>
                            </div> : <></>}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-auto flex items-center flex-none">
            <div className={cn(`absolute pl-3`)}>
                <div className={cn(`
                w-max flex items-center bg-red-500 justify-center
                 h-9 rounded-xl transition duration-500 ease-in-out`,
                    notifications.notificationPopup ? "" : "scale-0"
                )}>
                    <div className={cn("h-4 w-4 bg-red-500 relative right-[0.3rem] rotate-45 rounded-sm")} />
                    <div className={cn("flex items-center pr-2 gap-1 transition-all duration-700 ease-in-out",
                        notifications.notificationPopup ? "opacity-100" : "opacity-0")}>

                        {notifications.postNotification ? <div className="flex gap-1 items-center">
                            <Heart className="w-5 h-5 fill-current" />
                            <p className="font-semibold">
                                {notifications.postNotification.notificationCount}
                            </p>
                        </div> : <></>}

                        {notifications.commentNotification.isNotification ? <div className="flex gap-1 items-center">
                            <MessageCircle className="w-5 h-5 fill-current" />
                            <p className="font-semibold">
                                {notifications.commentNotification.notificationCount}
                            </p>
                        </div> : <></>}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationPopup;