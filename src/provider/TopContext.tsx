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
    const [isLoading, setIsLoading] = useState(splashShow);
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
    }, [theme, path])

    useEffect(() => {
        splashShow = false
        const timeoutId = setTimeout(() => {
            setIsLoading(false)
        }, 1300); // 1.3 seconds delay

        return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, []);


    return (
        <>
            <SplashScreen show={isLoading} />
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