"use client"
import {
    CircleUserRound,
    Film, Home,
    MessageCircleCode, Search
} from "lucide-react"

import React, { memo } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import SkyAvatar from "@/components/sky/SkyAvatar"
// for small screen device 
export const NavigationBottom = memo(function NavigationBottom() {
    // console.info("<NavigationBottom/>")
    const router = useRouter()
    const pageChange = (path: string) => router.push(path)
    const session = useSession().data?.user
    const SideIconData = [
        { icon: Home, label: "Home", onClick: () => pageChange('/') },
        { icon: Search, label: "Search", onClick: () => pageChange('/search') },
        { icon: Film, label: "Reels", onClick: () => pageChange('/reels') },
        { icon: MessageCircleCode, label: "Messages", onClick: () => pageChange('/message') },
        { icon: CircleUserRound, label: "Profile", onClick: () => pageChange(`/${session?.username || ""}`) },
    ]

    if(!session?.id){
        return <></>
    }

    return (
        <div className={`sm:hidden w-full sticky flex bottom-0 z-10 border-t
         py-2 bg-background text-foreground h-14 items-center`}>
            <div className="p-1 w-full flex justify-around">
                {SideIconData.map(({ icon, label, onClick }, index) => {
                    if (label === "Profile") {
                        return <div key={index} onClick={onClick}>
                            <SkyAvatar url={session?.image ?? null} className="h-7 w-7" />
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