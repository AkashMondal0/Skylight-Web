'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  AtSign, CircleUserRound, Compass,
  CopyPlus, Film, Heart, Home, Menu,
  MessageCircleCode, Search
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"
import { useRouter } from "next/navigation"
import NotificationModel from "../model/NotificationModel"
import SearchModel from "../model/SearchModel"
import MoreDropdownMenu from "../model/More_DropDown"
import UploadPostDialog from "@/components/home/dialog/upload-post"
import { useSession } from "next-auth/react"
import SkyAvatar from "@/components/sky/SkyAvatar"



export default function Lg_Navigation({
  hideLabel = false,
  hideNavigation = false
}: {
  hideLabel?: boolean
  hideNavigation?: boolean
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

  return (
    <div className={cn(`
        border-r scroll-smooth hideScrollbar
        h-[100dvh] overflow-y-auto md:flex
        hidden ease-in-out sticky top-0
        duration-300`,
      hideLabel ? "w-20" : "w-72 2xl:w-96 max-w-[20rem] md:w-20 xl:w-72"
    )}>
      <div className="p-1 w-full flex flex-col justify-between">
        <div>
          <Banner hideLabel={hideLabel} />
          <div className="space-y-3">
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
                  <SkyAvatar url={session?.image || null} className="h-full w-full max-h-8 max-w-8" />
                </NavigationItem>
              }
              return <NavigationItem key={index} label={label} hideLabel={hideLabel}
                onClick={onClick}>
                {icon}
              </NavigationItem>
            })}
          </div>
        </div>
        <MoreButton hideLabel={hideLabel} />
      </div>
    </div>
  )
}


const NavigationItem = ({ children, active, label, onClick, hideLabel }: {
  children: React.ReactNode
  active?: boolean
  label?: string
  onClick?: () => void
  hideLabel?: boolean
}) => {

  if (hideLabel) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onClick}
              variant={"ghost"}
              className={`w-full justify-start gap-4 h-full py-2 rounded-xl`}>
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            variant={"ghost"}
            className={`w-full justify-start gap-4 h-full py-2 rounded-xl`}>
            {children}
            <p className={cn(
              "hidden xl:block text-primary-500 text-base",
              active ? "font-bold" : "font-normal")}>
              {label}
            </p>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


const Banner = ({ hideLabel }: {
  hideLabel?: boolean
}) => {
  if (hideLabel) {
    return (
      <div>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 h-full rounded-xl my-8`}>
          <AtSign size={28} />
        </Button>
      </div>
    )
  }
  return (
    <div>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 xl:hidden h-full rounded-xl my-8`}>
        <AtSign size={28} />
      </Button>
      <div className={`hidden xl:block my-8
      text-primary-500 text-xl px-5
      font-semibold`}>
        Skymedia
      </div>
    </div>
  )
}

const MoreButton = ({ hideLabel }: {
  hideLabel?: boolean
}) => {

  if (hideLabel) {
    return <div>
      <MoreDropdownMenu>
        <Button
          variant={"ghost"}
          className={`w-full justify-start gap-4 h-full py-2 rounded-xl`}>
          <Menu size={28} />
        </Button>
      </MoreDropdownMenu>
    </div>
  }

  return <div>
    <MoreDropdownMenu>
      <Button
        variant={"ghost"}
        className={`w-full justify-start gap-4 h-full py-2 rounded-xl`}>
        <Menu size={28} />
        <p className={cn("hidden xl:block text-primary-500 text-base font-normal")}>
          More
        </p>
      </Button>
    </MoreDropdownMenu>
  </div>
}