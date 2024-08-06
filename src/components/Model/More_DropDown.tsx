"use client"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  BookMarked,
  Activity,
  Moon,
  SunMoon,
  Sun,
  MessageSquareWarning,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"
import { logoutApi } from "@/redux/services/account"
import { useRouter } from "next/navigation"

export default function MoreDropdownMenu({ children }: {
  children: React.ReactNode
}) {
  const { setTheme, theme } = useTheme()
  const changeTheme = (theme: string) => {
    setTheme(theme)
  }

  const router = useRouter()
  const CurrentTheme = () => {
    if (theme === "dark") {
      return <Moon className="mr-3 h-7 w-7" />
    } else if (theme === "light") {
      return <Sun className="mr-3 h-7 w-7" />
    } else {
      return <SunMoon className="mr-3 h-7 w-7" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 mx-4 rounded-xl">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuGroup className="space-y-2">
          <DropdownMenuItem className="rounded-xl">
            <Settings className="mr-3 h-7 w-7" />
            <span>Settings</span>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl">
            <Activity className="mr-3 h-7 w-7" />
            <span>Your Activity</span>
            {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl">
            <BookMarked className="mr-3 h-7 w-7" />
            <span>Saved</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="rounded-xl">
              <CurrentTheme />
              <span>Switch Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="rounded-xl">
                <DropdownMenuItem disabled={theme === "dark"} className="rounded-xl" onClick={() => changeTheme("dark")}>
                  <Moon className="mr-3 h-7 w-7" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={theme === "light"} className="rounded-xl" onClick={() => changeTheme("light")}>
                  <Sun className="mr-3 h-7 w-7" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={theme === "system"} className="rounded-xl" onClick={() => changeTheme("system")}>
                  <SunMoon className="mr-3 h-7 w-7" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="rounded-xl">
            <MessageSquareWarning className="mr-3 h-7 w-7" />
            <span>Report</span>
            {/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl">
          <Github className="mr-3 h-7 w-7" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl">
          <LifeBuoy className="mr-3 h-7 w-7" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="rounded-xl">
          <Cloud className="mr-3 h-7 w-7" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl" onClick={() => {
          signOut()
          logoutApi()
          router.replace('/auth/login')
        }}>
          <LogOut className="mr-3 h-7 w-7" />
          <span>Log out</span>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
