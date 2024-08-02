'use client'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { usePathname } from 'next/navigation'
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar'

const TopContext = memo(function TopContext({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()
    const path = usePathname()
    const [navigation, setNavigation] = useState({
        isHideNav: false,
        hideLabel: false
    })

    useEffect(() => {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        if (theme && theme !== "system") {
            metaThemeColor?.setAttribute(
                'content', theme === "dark" ?
                "rgb(10, 10, 10)" : "rgb(255, 255, 255)"
            );
        }
        if (path === "/") {
            return setNavigation((pre) => ({ ...pre, isHideNav: false, hideLabel: false }));
        } else if (path.includes("/message")) {
            return setNavigation((pre) => ({ ...pre, isHideNav: false, hideLabel: true }));
        } else if (path.includes("/auth/")) {
            return setNavigation((pre) => ({ ...pre, isHideNav: false }));
        } else {
            return setNavigation((pre) => ({ ...pre, isHideNav: false, hideLabel: false }));
        }
    }, [theme, path])

    return (<div className='w-full h-full flex'>
        <NavigationSidebar
            isHideNav={navigation.isHideNav}
            hideLabel={navigation.hideLabel} />
        {children}
    </div>)
}, (() => true))

export default TopContext






// [/,/explore,/*profile*, /message,/reels , /reels/* , "/",
// "/explore/:path*",
// "/message/:path*",
// "/reels/:path*",
// "/search/:path*",
// "/account/:path*",
// "/notification/:path*",]