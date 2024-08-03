'use client'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { usePathname } from 'next/navigation'
import { NavigationSidebar } from '@/components/Navigation/NavigationSidebar'
import SplashScreen from '@/components/sky/SplashScreen'
let splashShow = true

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
            setNavigation((pre) => ({ ...pre, isHideNav: false, hideLabel: false }));
        } else if (path.includes("/message")) {
            setNavigation((pre) => ({ ...pre, isHideNav: false, hideLabel: true }));
        } else if (path.includes("/auth/")) {
            setNavigation((pre) => ({ ...pre, isHideNav: false }));
        } else {
            setNavigation((pre) => ({ ...pre, isHideNav: false, hideLabel: false }));
        }
        if (splashShow) splashShow = false

    }, [theme, path])

    return (
        <>
            <SplashScreen show={splashShow} />
            <div className='w-full h-full md:flex'>
                <NavigationSidebar isHideNav={navigation.isHideNav} hideLabel={navigation.hideLabel} />
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