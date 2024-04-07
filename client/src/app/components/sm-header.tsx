"use client"
import { CopyPlus, Heart } from 'lucide-react'
import React from 'react'
import { useTheme } from "next-themes"

const Sm_Header = () => {
    const { setTheme , theme} = useTheme()
    const changeTheme = () => {
        if(theme === 'dark'){
            setTheme('light')
        }else{
            setTheme('dark')
        }
    }
    return (
        <div className="md:hidden flex sticky top-0 z-10 border-b h-14 bg-background text-foreground">
            <div className="p-4 w-full flex justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">Skymedia</span>
                </div>
                <div className="flex items-center gap-4">
                    <CopyPlus size={28} onClick={changeTheme} />
                    <Heart size={28} />
                </div>
            </div>
        </div>
    )
}

export default Sm_Header
