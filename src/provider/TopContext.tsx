/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { usePathname } from 'next/navigation'
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar'
import SplashScreen from '@/components/sky/SplashScreen'
import { MessageSideBar } from '@/components/Message/MessageSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { resetConversation } from '@/redux/slice/conversation'
import NotificationSidebar from '@/components/Sidebar/NotificationSidebar'
import { RootState } from '@/redux/store'
import {hideNavigationBar,
    hideNavigationBarLabel, resetNavigationBar, toggleNotificationSidebar, toggleSearchSidebar
} from '@/redux/slice/sidebar'
import SearchSidebar from '@/components/Sidebar/SearchSidebar'
let splashShow = true

const TopContext = memo(function TopContext({ children }: { children: React.ReactNode }) {
    const Sidebar = useSelector((state: RootState) => state.sidebarSlice)
    const { theme } = useTheme()
    const path = usePathname()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(splashShow);

    useEffect(() => {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        if (theme && theme !== "system") {
            metaThemeColor?.setAttribute(
                'content', theme === "dark" ?
                "rgb(10, 10, 10)" : "rgb(255, 255, 255)"
            );
        }
        if (path === "/") {
            dispatch(resetNavigationBar())
        } else if (path.includes("/message")) {
            dispatch(hideNavigationBarLabel())
        } else if (path.includes("/auth/")) {
            dispatch(hideNavigationBar())
        }
    }, [theme, path])

    useEffect(() => {
        splashShow = false
        const timeoutId = setTimeout(() => {
            setIsLoading(false)
        }, 900); // 0.9 seconds delay

        return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, []);

    const RenderChatList = () => {
        if (path === "/message") {
            dispatch(resetConversation())
            return <div className='w-full md:max-w-96 h-dvh'>
                <MessageSideBar />
            </div>
        }
        if (path.includes("/message/")) {
            return <div className='w-full md:max-w-96 h-dvh hidden md:flex'>
                <MessageSideBar />
            </div>
        }
        return <></>
    }
    return (
        <>
            <SplashScreen show={isLoading} />
            <div className='w-full h-full sm:flex'>
                <NavigationSidebar
                    isHideNav={Sidebar.hideNavigationBar}
                    hideLabel={Sidebar.hideNavigationBarLabel} />
                <NotificationSidebar
                    close={() => dispatch(toggleNotificationSidebar())}
                    open={Sidebar.notificationSidebar} />
                <SearchSidebar close={() => dispatch(toggleSearchSidebar())}
                    open={Sidebar.searchSidebar} />
                <RenderChatList />
                {children}
            </div>
        </>
    )
}, (() => true))

export default TopContext






// [/,/explore,/*profile*, /message,/reels , /reels/* , "/",
// "/explore/:path*",
// "/message/:path*",
// "/reels/:path*",
// "/search/:path*",
// "/account/:path*",
// "/notification/:path*",]