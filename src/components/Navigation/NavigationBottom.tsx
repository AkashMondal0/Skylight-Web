"use client"
import {
    CircleUserRound,
    Film, Home,
    MessageCircleCode, Search
} from "lucide-react"

import React, { memo } from "react"
import { useRouter } from "next/navigation"
import SkyAvatar from "@/components/sky/SkyAvatar"
import NotificationPing from "../Alert/NotificationPing"
import { useSelector } from "react-redux"
import { RootState } from "@/redux-stores/store"
import { cn } from "@/lib/utils"
import { OptimizedImage } from "../sky"
// for small screen device 
export const NavigationBottom = memo(function NavigationBottom() {
    // console.info("<NavigationBottom/>")
    const router = useRouter()
    const pageChange = (path: string) => router.push(path)
    const session = useSelector((state: RootState) => state.AccountState.session)
    const SideIconData = [
        { icon: Home, label: "Home", onClick: () => pageChange('/') },
        { icon: Search, label: "Search", onClick: () => pageChange('/search') },
        { icon: Film, label: "Reels", onClick: () => pageChange('/reels') },
        { icon: MessageCircleCode, label: "Messages", onClick: () => pageChange('/message') },
        { icon: CircleUserRound, label: "Profile", onClick: () => pageChange(`/${session?.username || ""}`) },
    ]

    return (
        <div className={`md:hidden w-full sticky flex bottom-0 z-10 border-t
         py-2 bg-background text-foreground h-14 items-center`}>
            <div className="p-1 w-full flex justify-around">
                {SideIconData.map(({ icon, label, onClick }, index) => {
                    if (label === "Profile") {
                        return <div key={index} onClick={onClick}>
                            <OptimizedImage
                                src={session?.profilePicture}
                                width={50}
                                height={50}
                                alt="Picture of the author"
                                sizes={"(min-width: 808px) 20vw, 30vw"}
                                fetchPriority="high"
                                className={cn(`w-8 h-8 cursor-pointer 
                                rounded-full userNotSelectImg bg-muted
                                 object-cover p-0`)} />
                        </div>
                    }
                    if (label === "Messages") {
                        return <div key={index} onClick={onClick}>
                            <div className="relative">
                                <NotificationPing />
                                {React.createElement(icon, { size: 28 })}
                            </div>
                        </div>
                    }
                    return <div key={index} onClick={onClick}>
                        {React.createElement(icon, { size: 28 })}
                    </div>
                })}
            </div>
        </div>
    )
}, (() => true))