'use client'
import React, { useEffect } from 'react'
import { useTheme } from "next-themes"
import { usePathname } from 'next/navigation'


const StatusbarColorInitial = () => {
    const { theme } = useTheme()
    const path = usePathname()
    useEffect(() => {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        if (theme && theme !== "system") {
            metaThemeColor?.setAttribute(
                'content', theme === "dark" ?
                "rgb(10, 10, 10)" : "rgb(255, 255, 255)"
            );
        }
    }, [theme, path])

    return <></>
}

export default StatusbarColorInitial
