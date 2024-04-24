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
import NotificationModel from "./model/NotificationModel"
import SearchModel from "./model/SearchModel"
import MoreDropdownMenu from "./model/More_DropDown"
import UploadPostDialog from "../(home)/components/dialog/upload-post"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"


export default function Lg_Navigation({
  hideLabel = false
}: {
  hideLabel?: boolean
}) {
  const router = useRouter()
  const pageChange = (path: string) => router.push(path)
  const profile = useSelector((state: RootState) => state.profile)
  const SideIconData = [
    { icon: Home, label: "Home", onClick: () => pageChange('/') },
    { icon: Search, label: "Search", onClick: () => { } },
    { icon: Compass, label: "Explore", onClick: () => pageChange('/explore') },
    { icon: Film, label: "Reels", onClick: () => pageChange('/reels/5') },
    { icon: MessageCircleCode, label: "Messages", onClick: () => pageChange('/message') },
    { icon: Heart, label: "Notifications", onClick: () => { } },
    { icon: CopyPlus, label: "Create", onClick: () => { } },
    { icon: CircleUserRound, label: "Profile", onClick: () => pageChange(`/${profile.profileData?.email}`) },
  ]

  return (
    <div className={cn(`
        border-r scroll-smooth hideScrollbar
        h-[100dvh] overflow-y-auto md:flex
        hidden ease-in-out sticky top-0
        duration-300`,
      hideLabel ? "w-20" : "w-72 2xl:w-96 max-w-[20rem] md:w-20 xl:w-72"
    )}>
      <div className="p-2 w-full flex flex-col justify-between">
        <div>
          <Banner hideLabel={hideLabel} />
          <div className="space-y-3">
            {SideIconData.map(({ icon, label, onClick }, index) => {
              if (label === "Notifications") {
                return <NotificationModel key={index}>
                  <NavigationItem label={label} onClick={onClick} hideLabel={hideLabel}>
                    {React.createElement(icon, { size: 28 })}
                  </NavigationItem>
                </NotificationModel>
              }
              if (label === "Search") {
                return <SearchModel key={index}>
                  <NavigationItem label={label} onClick={onClick} hideLabel={hideLabel}>
                    {React.createElement(icon, { size: 28 })}
                  </NavigationItem>
                </SearchModel>
              }
              if (label === "Create") {
                return <UploadPostDialog key={index}>
                  <NavigationItem key={index} label={label} hideLabel={hideLabel}
                    onClick={onClick}>
                    {React.createElement(icon, { size: 28 })}
                  </NavigationItem>
                </UploadPostDialog>
              }
              return <NavigationItem key={index} label={label} hideLabel={hideLabel}
                onClick={onClick}>
                {React.createElement(icon, { size: 28 })}
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