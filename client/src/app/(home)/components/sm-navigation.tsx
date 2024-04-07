import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import {
    CircleUserRound, Compass,
    CopyPlus, Film, Heart, Home, Menu,
    MessageCircleCode, Search
} from "lucide-react"

const SideIconData = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Film, label: "Reels" },
    { icon: MessageCircleCode, label: "Messages" },
    { icon: CircleUserRound, label: "Profile" },
]

const Sm_Navigation = () => {
    return (
        <div className="md:hidden flex sticky bottom-0 z-10 border-t py-2">
            <div className="p-2 w-full flex justify-around">
                {SideIconData.map(({ icon, label }, index) => (
                    <NavigationItem key={index} label={label} active={label === "Home"}>
                        {React.createElement(icon, { size: 28 })}
                    </NavigationItem>
                ))}
            </div>
        </div>
    )
}

const NavigationItem = ({ children, active, label }: {
    children: React.ReactNode
    active?: boolean
    label?: string
}) => {
    return (
        <div>
            {children}
        </div>
    )
}
export default Sm_Navigation
