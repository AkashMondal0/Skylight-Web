'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  AtSign, CircleUserRound, Compass,
  CopyPlus, Film, Heart, Home, Menu,
  MessageCircleCode, Search
} from "lucide-react"
import React from "react"

const SideIconData = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Compass, label: "Explore" },
  { icon: Film, label: "Reels" },
  { icon: MessageCircleCode, label: "Messages" },
  { icon: Heart, label: "Notifications" },
  { icon: CopyPlus, label: "Create" },
  { icon: CircleUserRound, label: "Profile" },
]

export default function Lg_Navigation() {
  return (
    <div className="p-2 w-full flex flex-col justify-between">
      <div>
        <Banner />
        <div className="space-y-3">
          {SideIconData.map(({ icon, label }, index) => (
            <NavigationItem key={index} label={label} active={label === "Home"}>
              {React.createElement(icon, { size: 30 })}
            </NavigationItem>
          ))}
        </div>
      </div>
      <MoreButton />
    </div>
  )
}


const NavigationItem = ({ children, active, label }: {
  children: React.ReactNode
  active?: boolean
  label?: string
}) => {
  return (
    <Button
      variant={"ghost"}
      className={`w-full justify-start gap-4 h-full py-2 rounded-xl`}>
      {children}
      <p className={cn(
        "hidden xl:block text-primary-500 text-base",
        active ? "font-bold" : "font-normal")}>
        {label}
      </p>
    </Button>
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
        <AtSign size={30} />
      </Button>
    </div>
  )
}

const MoreButton = () => {
  return <div>
    <Button
      variant={"ghost"}
      className={`w-full justify-start gap-4 h-full py-2 rounded-xl`}>
      <Menu size={30} />
      <p className={cn("hidden xl:block text-primary-500 text-base font-normal")}>
        More
      </p>
    </Button>
  </div>
}