'use client'
import React from 'react'
import {
    CircleUserRound, Compass,
    CopyPlus, Film, Heart, Home, Menu,
    MessageCircleCode, Search
} from "lucide-react"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import SkyAvatar from '@/components/sky/SkyAvatar'


const Sm_Navigation = () => {
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

    return (
        <div className="md:hidden w-full sticky
        flex bottom-0 z-10 border-t py-2 bg-background 
        text-foreground h-[6dvh] items-center">
            <div className="p-2 w-full flex justify-around">
                {SideIconData.map(({ icon, label, onClick }, index) => {
                    if (label === "Profile") {
                        return <NavigationItem key={index} label={label}
                            onClick={onClick} active={label === "Profile"}>
                            <SkyAvatar url={session?.image || null} className="h-full w-full max-h-8 max-w-8" />
                        </NavigationItem>
                    }
                    return <NavigationItem key={index} label={label}
                        onClick={onClick} active={label === "Home"}>
                        {React.createElement(icon, { size: 28 })}
                    </NavigationItem>
                })}
            </div>
        </div>
    )
}

const NavigationItem = ({ children, active, label, onClick }: {
    children: React.ReactNode
    active?: boolean
    label?: string
    onClick: () => void
}) => {
    return (
        <div onClick={onClick}>
            {children}
        </div>
    )
}
export default Sm_Navigation
