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
import React, { memo, useMemo } from "react"
import { useRouter } from "next/navigation"
import MoreDropdownMenu from "@/components/Option/HomePageMenu"
import UploadPostDialog from "@/components/Dialog/UploadPost.Dialog"
import { useSession } from "next-auth/react"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { configs } from "@/configs"
import NotificationPopup from "../Alert/NotificationPopup"
import NotificationPing from "../Alert/NotificationPing"
import { useDispatch, useSelector } from "react-redux"
import { toggleNotificationSidebar, toggleSearchSidebar } from "@/redux/slice/sidebar"
import NotificationSidebar from "../Sidebar/NotificationSidebar"
import SearchSidebar from "../Sidebar/SearchSidebar"
import { RootState } from "@/redux/store"

// for large screen device 
export const NavigationSidebar = memo(function NavigationSidebar({
    hideLabel = false,
    isHideNav = false,
    sidebarModal = false
}: {
    hideLabel?: boolean
    isHideNav?: boolean,
    sidebarModal?: React.ReactNode
}) {
    const Sidebar = useSelector((state: RootState) => state.sidebarSlice)
    const router = useRouter()
    const dispatch = useDispatch()
    const pageChange = (path: string) => router.push(path)
    const hideLabelClass = useMemo(() => {
        if (
            hideLabel ||
            Sidebar.notificationSidebar ||
            Sidebar.searchSidebar
        ) return true
    }, [hideLabel, Sidebar.notificationSidebar, Sidebar.searchSidebar])
    const session = useSession().data?.user
    const SideIconData = [
        { icon: <Home className="w-full h-full p-[2px]" />, label: "Home", onClick: () => pageChange('/') },
        { icon: <Search className="w-full h-full p-[2px]" />, label: "Search", onClick: () => { dispatch(toggleSearchSidebar()) } },
        { icon: <Compass className="w-full h-full p-[2px]" />, label: "Explore", onClick: () => pageChange('/explore') },
        { icon: <Film className="w-full h-full p-[2px]" />, label: "Reels", onClick: () => pageChange('/reels/5') },
        { icon: <MessageCircleCode className="w-full h-full p-[2px]" />, label: "Messages", onClick: () => pageChange('/message') },
        { icon: <Heart className="w-full h-full p-[2px]" />, label: "Notifications", onClick: () => { dispatch(toggleNotificationSidebar()) } },
        { icon: <UploadPostDialog><CopyPlus className="w-full h-full p-[2px]" /></UploadPostDialog>, label: "Create", onClick: () => { } },
        { icon: <SkyAvatar url={session?.image || null} className="h-8 w-8" />, label: "Profile", onClick: () => pageChange(`/${session?.username || ""}`) },
    ]

    if (isHideNav) return <></>

    return (
        <div>
            <div className={cn(
                "md:w-[4.5rem] xl:w-[18rem] border-r hidden md:flex h-dvh scroll-smooth overflow-x-hidden overflow-y-auto hideScrollbar",
                hideLabel ? "max-w-[4.5rem]" : "max-w-[18rem]"
            )}>
                <div className={cn(`md:w-[4.5rem] xl:w-[18rem] px-1 sticky top-0 z-50 h-full scroll-smooth overflow-y-auto hideScrollbar`,
                    hideLabelClass ? "max-w-[4.5rem]" : "max-w-[18rem]")}>
                    <div className="w-full h-full flex flex-col space-y-1">
                        {/* header type */}
                        <Logo label={configs.AppDetails.name} onClick={SideIconData[0].onClick} hideLabel={hideLabelClass} />
                        {/* main type */}
                        {SideIconData.map(({ icon, label, onClick }, index) => {
                            if (label === "Messages") {
                                return <NavigationItemMessage
                                    icon={icon} key={index}
                                    label={label} onClick={onClick}
                                    hideLabel={hideLabelClass} />
                            }
                            return <NavigationItem
                                key={index}
                                label={label}
                                hideLabel={hideLabelClass}
                                onClick={onClick}>
                                {icon}
                            </NavigationItem>
                        })}
                        {/* footer type */}
                        <MoreDropdownMenu>
                            <div>
                                <NavigationItem label="More" hideLabel={hideLabelClass}>
                                    <Menu size={28} />
                                </NavigationItem>
                            </div>
                        </MoreDropdownMenu>
                    </div>
                </div>
                {/* sidebar */}
                <NotificationSidebar close={() => dispatch(toggleNotificationSidebar())} open={Sidebar.notificationSidebar} />
                <SearchSidebar close={() => dispatch(toggleSearchSidebar())} open={Sidebar.searchSidebar} />
            </div>
        </div>
    )
}, ((pre, next) => {
    return false
}))

const Logo = ({ active, label, onClick, hideLabel, className }: {
    active?: boolean
    label?: string
    onClick?: () => void
    hideLabel?: boolean
    className?: string
}) => {

    return (
        <div className={cn("w-14 h-14 mx-auto xl:w-full xl:mx-0 my-6", className)}>
            <div onClick={onClick} className={cn(`mx-auto justify-center 
            h-14 w-14 aspect-square items-center flex rounded-xl cursor-pointer`,
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
        <div className={cn("w-14 h-14 mx-auto xl:w-full xl:mx-0", className)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={onClick}
                            className={cn(`mx-auto justify-center h-14 w-14 aspect-square items-center flex rounded-xl
                            hover:bg-accent hover:text-accent-foreground cursor-pointer`,
                                hideLabel ? "sm:flex justify-center" : "lg:w-full lg:gap-3 xl:justify-start xl:px-4")}>
                            <div className="w-8 h-8 flex items-start justify-center">
                                {children}
                            </div>
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

const NavigationItemNotification = ({ active, label, hideLabel, className, icon, onClick }: {
    active?: boolean
    label?: string
    hideLabel?: boolean
    className?: string
    icon?: React.ReactNode
    onClick?: () => void
}) => {
    return (
        <div className={cn("w-14 h-14 mx-auto xl:w-full xl:mx-0", className)} onClick={onClick}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className={cn(`mx-auto justify-center h-14 w-14 aspect-square flex rounded-xl
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
        <div className={cn("w-14 h-14 mx-auto xl:w-full xl:mx-0", className)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={onClick}
                            className={cn(`mx-auto justify-center h-14 w-14 aspect-square flex rounded-xl
                            hover:bg-accent hover:text-accent-foreground cursor-pointer`,
                                hideLabel ? "sm:flex justify-center" : "lg:w-full xl:justify-start xl:px-4")}>
                            <div className="flex items-center justify-center gap-3">
                                <div className="flex justify-end w-auto h-auto">
                                    <div className="w-8 h-8 flex items-start justify-center">
                                        {icon}
                                    </div>
                                    <NotificationPing />
                                </div>
                                {hideLabel ? <></> : <p className={cn("text-primary-500 text-base hidden xl:block",
                                    active ? "font-bold" : "font-normal")}>{label}</p>}
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