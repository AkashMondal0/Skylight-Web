'use client'
import React from 'react'
import {
    CircleUserRound, Compass,
    CopyPlus, Film, Heart, Home, Menu,
    MessageCircleCode, Search
} from "lucide-react"
import { useRouter } from 'next/navigation'


const Sm_Navigation = () => {
    const router = useRouter()
    const pageChange = (path: string) => router.push(path)
    const SideIconData = [
        { icon: Home, label: "Home", onClick: () => pageChange('/') },
        { icon: Search, label: "Search", onClick: () => pageChange('/search') },
        { icon: Film, label: "Reels", onClick: () => pageChange('/reels') },
        { icon: MessageCircleCode, label: "Messages", onClick: () => pageChange('/message') },
        { icon: CircleUserRound, label: "Profile", onClick: () => pageChange('/profile') },
    ]
    return (
        <div className="md:hidden flex sticky bottom-0 z-10 border-t py-2 bg-background text-foreground">
            <div className="p-2 w-full flex justify-around">
                {SideIconData.map(({ icon, label, onClick }, index) => (
                    <NavigationItem key={index} label={label}
                        onClick={onClick} active={label === "Home"}>
                        {React.createElement(icon, { size: 28 })}
                    </NavigationItem>
                ))}
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
