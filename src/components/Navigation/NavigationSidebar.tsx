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
import React, { memo, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import NotificationModel from "@/components/home/model/NotificationModel"
import SearchModel from "@/components/home/model/SearchModel"
import MoreDropdownMenu from "@/components/home/model/More_DropDown"
import UploadPostDialog from "@/components/home/dialog/upload-post"
import { useSession } from "next-auth/react"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { configs } from "@/configs"

// for large screen device 
export const NavigationSidebar = memo(function NavigationSidebar({
    hideLabel = false,
    hideNavigation = false
}: {
    hideLabel?: boolean
    hideNavigation?: boolean
}) {
    const router = useRouter()
    const path = usePathname()
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

    useEffect(()=>{
        console.info("path", path)
    },[path === "/message"])

    return (
        <div className={cn(`border-r scroll-smooth overflow-y-auto ease-in-out duration-300
       hidden md:flex md:w-20 lg:w-full max-w-72 min-h-dvh`,
            hideNavigation ? "md:w-20" : "w-72"
        )}>
            <div className="w-full h-full flex flex-col space-y-2 justify-between py-8 px-2">
                <div className="space-y-2">
                    <Banner hideLabel={hideLabel} />
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
                <MoreButton hideLabel={hideLabel} />
            </div>
        </div>
    )
})

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
                    <MyButton onClick={onClick}>
                        {children}
                        <p className={cn("hidden lg:block text-primary-500 text-base", active ? "font-bold" : "font-normal")}>
                            {label}
                        </p>
                    </MyButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const Banner = ({
    hideLabel,
    onClick
}: {
    hideLabel?: boolean
    onClick?: () => void
}) => {
    return (
        <MyButton onClick={onClick}>
            <img src={configs.AppDetails.logoUrl} alt="upload" className="w-8 h-8" />
            <p className={cn(`hidden lg:flex text-lg font-semibold`,
                hideLabel ? "hidden" : ""
            )}>
                {configs.AppDetails.name}
            </p>
        </MyButton>
    )
}

const MoreButton = ({ hideLabel }: {
    hideLabel?: boolean
}) => {
    return (
        <MoreDropdownMenu>
            <MyButton>
                <Menu size={28} />
                <p className={cn(`hidden lg:flex`, hideLabel ? "hidden" : "")}>
                    More
                </p>
            </MyButton>
        </MoreDropdownMenu>
    )

}

const MyButton = ({
    children,
    onClick
}: {
    children: React.ReactNode,
    onClick?: () => void
}) => {
    return (
        <div onClick={onClick}
            className={`lg:w-full lg:justify-start lg:px-4 lg:gap-2
        md:flex md:w-14 justify-center max-w-72 mx-auto 
        h-14 items-center flex rounded-xl
        hover:bg-accent hover:text-accent-foreground cursor-pointer`}>
            {children}
        </div>
    )
}