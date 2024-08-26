/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { memo, useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import SplashScreen from '@/components/sky/SplashScreen'
import { usePathname } from 'next/navigation'
let splashShow = true

const TopContext = memo(function TopContext() {
    const { theme } = useTheme()
    const path = usePathname()
    const [isLoading, setIsLoading] = useState(splashShow);

    useEffect(() => {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        if (theme && theme !== "system") {
            metaThemeColor?.setAttribute(
                'content', theme === "dark" ?
                "rgb(10, 10, 10)" : "rgb(255, 255, 255)"
            );
        }
    }, [theme, path]);

    useEffect(() => {
        splashShow = false
        const timeoutId = setTimeout(() => {
            setIsLoading(false)
        }, 600); // 0.6 seconds delay

        return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, []);
    return (<>
    {/* <SplashScreen show={isLoading} /> */}
    </>)
}, (() => true))

export default TopContext