'use client'
import React, { useEffect } from 'react'
import { useTheme } from "next-themes"


const StatusbarColorInitial = () => {
    const { theme } = useTheme()
    useEffect(() => {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        if (theme && theme !== "system") {
            metaThemeColor?.setAttribute(
                'content', theme === "dark" ? 
                "rgb(10, 10, 10)" : "light"
            );
        }
    }, [theme])

    return <></>
}

export default StatusbarColorInitial
