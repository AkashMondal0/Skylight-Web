/* eslint-disable @next/next/no-img-element */
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
import NotificationPopup from "../Alert/NotificationPopup"
import NotificationPing from "../Alert/NotificationPing"

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
        <div className={cn(`border-r scroll-smooth overflow-y-auto ease-in-out duration-300 p-1
        hidden md:flex md:w-20 xl:w-72 max-w-72 w-72 min-h-full overflow-x-hidden h-dvh hideScrollbar`, hideLabel ? "max-w-20" : "max-w-72")}>
            <div className="w-full h-full flex flex-col justify-between">
                <div>
                    <Logo label={configs.AppDetails.name} onClick={SideIconData[0].onClick} hideLabel={hideLabel} />
                    {SideIconData.map(({ icon, label, onClick }, index) => {
                        if (label === "Notifications") {
                            return <NotificationModel key={index}>
                                <NavigationItemNotification icon={icon}
                                    label={label} onClick={onClick} hideLabel={hideLabel} />
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
                        if (label === "Messages") {
                            return <NavigationItemMessage icon={icon} key={index}
                                label={label} onClick={onClick} hideLabel={hideLabel} />
                        }
                        return <NavigationItem key={index} label={label} hideLabel={hideLabel}
                            onClick={onClick}>
                            {icon}
                        </NavigationItem>
                    })}
                </div>
                <MoreDropdownMenu>
                    <div>
                        <NavigationItem label="More" hideLabel={hideLabel}>
                            <Menu size={28} />
                        </NavigationItem>
                    </div>
                </MoreDropdownMenu>
            </div>
        </div>
    )
}, ((pre: any, next: any) => {
    return pre.isHideNav === next.isHideNav && pre.hideLabel === next.hideLabel
}))

const Logo = ({ active, label, onClick, hideLabel, className }: {
    active?: boolean
    label?: string
    onClick?: () => void
    hideLabel?: boolean
    className?: string
}) => {

    return (
        <div className={cn("w-16 h-14 mx-auto xl:w-full xl:mx-0 my-6", className)}>
            <div onClick={onClick} className={cn(`max-w-72 mx-auto justify-center 
            h-14 w-16 aspect-square items-center flex rounded-xl cursor-pointer`,
                hideLabel ? "sm:flex justify-center" : "lg:w-full lg:gap-1 xl:justify-start xl:px-4")}>
                <img src={configs.AppDetails.logoUrl} alt="upload" className="w-8 h-8" />
                {hideLabel ? <></> : <p className={cn("text-primary-500 hidden xl:block font-bold text-xl")}>
                    {label}
                </p>}
            </div>
        </div>
    )
}

const NavigationItem = ({ children, active, label, onClick, hideLabel, className }: {
    children: React.ReactNode
    active?: boolean
    label?: string
    onClick?: () => void
    hideLabel?: boolean
    className?: string
}) => {

    return (
        <div className={cn("w-16 h-14 mx-auto xl:w-full xl:mx-0", className)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={onClick}
                            className={cn(`max-w-72 mx-auto justify-center h-14 w-16 aspect-square items-center flex rounded-xl
                            hover:bg-accent hover:text-accent-foreground cursor-pointer`, hideLabel ? "sm:flex justify-center" : "lg:w-full lg:gap-3 xl:justify-start xl:px-4")}>
                            {children}
                            {hideLabel ? <></> : <p className={cn("text-primary-500 text-base hidden xl:block", active ? "font-bold" : "font-normal")}>{label}</p>}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="rounded-full">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

const NavigationItemNotification = ({ active, label, onClick, hideLabel, className, icon }: {
    active?: boolean
    label?: string
    onClick?: () => void
    hideLabel?: boolean
    className?: string
    icon?: React.ReactNode
}) => {

    return (
        <div className={cn("w-16 h-14 mx-auto xl:w-full xl:mx-0", className)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={onClick}
                            className={cn(`max-w-72 mx-auto justify-center h-14 w-16 aspect-square flex rounded-xl
                            hover:bg-accent hover:text-accent-foreground cursor-pointer`,
                                hideLabel ? "sm:flex justify-center" : "lg:w-full xl:justify-start xl:px-4")}>
                            <div className="flex items-center justify-center gap-3">
                                {icon}
                                {hideLabel ? <></> : <p className={cn("text-primary-500 text-base hidden xl:block", active ? "font-bold" : "font-normal")}>{label}</p>}
                            </div>
                            <NotificationPopup />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="rounded-full">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

const NavigationItemMessage = ({ active, label, onClick, hideLabel, className, icon }: {
    active?: boolean
    label?: string
    onClick?: () => void
    hideLabel?: boolean
    className?: string
    icon?: React.ReactNode
}) => {

    return (
        <div className={cn("w-16 h-14 mx-auto xl:w-full xl:mx-0", className)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={onClick}
                            className={cn(`max-w-72 mx-auto justify-center h-14 w-16 aspect-square flex rounded-xl
                            hover:bg-accent hover:text-accent-foreground cursor-pointer`,
                                hideLabel ? "sm:flex justify-center" : "lg:w-full xl:justify-start xl:px-4")}>
                            <div className="flex items-center justify-center gap-3">
                                <div className="flex justify-end w-auto h-auto">
                                    <NotificationPing />
                                    {icon}
                                </div>
                                {hideLabel ? <></> : <p className={cn("text-primary-500 text-base hidden xl:block", active ? "font-bold" : "font-normal")}>{label}</p>}
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="rounded-full">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}