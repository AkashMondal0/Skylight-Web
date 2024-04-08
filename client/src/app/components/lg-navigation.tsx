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


export default function Lg_Navigation() {
  const router = useRouter()
  const pageChange = (path: string) => router.push(path)

  const SideIconData = [
    { icon: Home, label: "Home", onClick: () => pageChange('/') },
    { icon: Search, label: "Search", onClick: () => { } },
    { icon: Compass, label: "Explore", onClick: () => pageChange('/explore') },
    { icon: Film, label: "Reels", onClick: () => pageChange('/reels') },
    { icon: MessageCircleCode, label: "Messages", onClick: () => pageChange('/message') },
    { icon: Heart, label: "Notifications", onClick: () => { } },
    { icon: CopyPlus, label: "Create", onClick: () => pageChange('/create') },
    { icon: CircleUserRound, label: "Profile", onClick: () => pageChange('/profile') },
  ]

  return (
    <div className={`
        border-r scroll-smooth
        h-[100dvh] overflow-y-auto
        hidden md:flex md:w-20
        xl:w-72 ease-in-out 
        duration-300`}>
      <div className="p-2 w-full flex flex-col justify-between">
        <div>
          <Banner />
          <div className="space-y-3">
            {SideIconData.map(({ icon, label, onClick }, index) => {
              if (label === "Notifications") {
                return <NotificationModel key={index}>
                  <NavigationItem label={label} onClick={onClick}>
                    {React.createElement(icon, { size: 28 })}
                  </NavigationItem>
                </NotificationModel>
              }
              if (label === "Search") {
                return <SearchModel key={index}>
                  <NavigationItem label={label} onClick={onClick}>
                    {React.createElement(icon, { size: 28 })}
                  </NavigationItem>
                </SearchModel>
              }
              return <NavigationItem key={index} label={label}
                onClick={onClick}>
                {React.createElement(icon, { size: 28 })}
              </NavigationItem>
            })}
          </div>
        </div>
        <MoreButton />
      </div>
    </div>
  )
}


const NavigationItem = ({ children, active, label, onClick }: {
  children: React.ReactNode
  active?: boolean
  label?: string
  onClick?: () => void
}) => {
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


const Banner = () => {
  return (
    <div>
      <div className={`hidden xl:block my-8
        text-primary-500 text-xl px-5
        font-semibold`}>
        Skymedia
      </div>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 xl:hidden h-full rounded-xl my-8`}>
        <AtSign size={28} />
      </Button>
    </div>
  )
}

const MoreButton = () => {
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