"use client"
import { cn } from "@/lib/utils"
import {
    CircleUserRound, Compass,
    CopyPlus, Film, Heart, Home, Menu,
    MessageCircleCode, Search
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { memo } from "react"
import { useRouter } from "next/navigation"
import NotificationModel from "@/components/Model/NotificationModel"
import SearchModel from "@/components/Model/SearchModel"
import MoreDropdownMenu from "@/components/Model/More_DropDown"
import UploadPostDialog from "@/components/Dialog/UploadPost.Dialog"
import { useSession } from "next-auth/react"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { configs } from "@/configs"

// for large screen device 
export const NavigationSidebar = memo(function NavigationSidebar({ hideLabel, isHideNav }: {
    hideLabel?: boolean
    isHideNav: boolean
}) {
    const router = useRouter()
    const pageChange = (path: string) => router.push(path)
    const session = useSession().data?.user
    const SideIconData = [
        { icon: <Home size={28} />, label: "Home", onClick: () => pageChange('/') },
        { icon: <Search size={28} />, label: "Search", onClick: () => { } },
        { icon: <Compass size={28} />, label: "Explore", onClick: () => pageChange('/explore') },
        { icon: <Film size={28} />, label: "Reels", onClick: () => pageChange('/reels/5') },
        { icon: <MessageCircleCode size={28} />, label: "Messages", onClick: () => pageChange('/message') },
        { icon: <Heart size={28} />, label: "Notifications", onClick: () => { } },
        { icon: <CopyPlus size={28} />, label: "Create", onClick: () => { } },
        { icon: <CircleUserRound size={28} />, label: "Profile", onClick: () => pageChange(`/${session?.username || ""}`) },
    ]

    if (!session?.id) {
        return <></>
    }
    if (isHideNav) return <></>

    return (
        <div className={cn(`border-r scroll-smooth overflow-y-auto ease-in-out duration-300 hidden sm:flex sm:w-20 xl:w-72 max-w-72 w-72 min-h-full overflow-x-hidden h-dvh hideScrollbar`, hideLabel ? "w-20" : "w-72")}>
            <div className="w-full h-full flex flex-col space-y-2 justify-between p-2">
                <div className="space-y-1">
                    <div className="h-3" />
                    <NavigationItem label={configs.AppDetails.name}>
                        <img src={configs.AppDetails.logoUrl} alt="upload" className="w-8 h-8" />
                    </NavigationItem>
                    <div className="h-6" />
                    {SideIconData.map(({ icon, label, onClick }, index) => {
                        if (label === "Notifications") {
                            return <NotificationModel key={index}>
                                <NavigationItem label={label} onClick={onClick} hideLabel={hideLabel}>
                                    {icon}
                                </NavigationItem>
                            </NotificationModel>
                        }
                        if (label === "Search") {
                            return <SearchModel key={index}>
                                <NavigationItem label={label} onClick={onClick} hideLabel={hideLabel}>
                                    {icon}
                                </NavigationItem>
                            </SearchModel>
                        }
                        if (label === "Create") {
                            return <UploadPostDialog key={index}>
                                <NavigationItem key={index} label={label} hideLabel={hideLabel}
                                    onClick={onClick}>
                                    {icon}
                                </NavigationItem>
                            </UploadPostDialog>
                        }
                        if (label === "Profile") {
                            return <NavigationItem key={index} label={label} hideLabel={hideLabel}
                                onClick={onClick}>
                                <SkyAvatar url={session?.image || null} className="h-8 w-8" />
                            </NavigationItem>
                        }
                        return <NavigationItem key={index} label={label} hideLabel={hideLabel}
                            onClick={onClick}>
                            {icon}
                        </NavigationItem>
                    })}
                </div>
                <NavigationItem label="More">
                    <MoreDropdownMenu>
                        <Menu size={28} />
                    </MoreDropdownMenu>
                </NavigationItem>
            </div>
        </div>
    )
}, ((pre: any, next: any) => {
    return pre.isHideNav === next.isHideNav && pre.hideLabel === next.hideLabel
}))

const NavigationItem = ({ children, active, label, onClick, hideLabel }: {
    children: React.ReactNode
    active?: boolean
    label?: string
    onClick?: () => void
    hideLabel?: boolean
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div onClick={onClick}
                        className={cn(`max-w-72 mx-auto justify-center h-12 items-center flex rounded-xl
                        hover:bg-accent hover:text-accent-foreground cursor-pointer`, hideLabel ? "sm:flex justify-center" : "lg:w-full lg:px-4 lg:gap-3 lg:justify-start")}>
                        {children}
                        {hideLabel ? <></> : <p className={cn("text-primary-500 text-base hidden xl:block", active ? "font-bold" : "font-normal")}>{label}</p>}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="rounded-full">
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}