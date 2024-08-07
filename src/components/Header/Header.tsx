"use client"
import { ChevronLeft, CopyPlus, Heart } from 'lucide-react'
import React, { memo } from 'react'
import { useRouter } from 'next/navigation'
import { configs } from '@/configs'
import UploadPostDialog from '@/components/Dialog/UploadPost.Dialog'

export const AppHeader = memo(function AppHeader() {
    // console.info("<AppHeader/>")
    const router = useRouter()
    return (
        <div className="sm:hidden flex sticky top-0 z-10 w-full
         border-b h-14 bg-background text-foreground">
            <div className="p-4 w-full flex justify-between">
                <div className="flex items-center">
                    <img src={configs.AppDetails.logoUrl} alt="logo" className="w-6 h-6" />
                    <span className="text-xl font-bold">SkyLight</span>
                </div>
                <div className="flex items-center gap-4">
                    <UploadPostDialog>
                        <div>
                            <CopyPlus size={28} className='cursor-pointer' />
                        </div>
                    </UploadPostDialog>
                    <Heart size={28} onClick={() => {
                        router.push('/search')
                    }} />
                </div>
            </div>
        </div>
    )
})

export const AppNavbar = memo(function ProfileHeader({ name, isProfile, icon2 = false, backButton = true }: { name: string, isProfile?: boolean, icon2?: React.ReactNode, backButton?: boolean }) {
    const router = useRouter()
    return (
        <div className="md:hidden flex sticky top-0 z-10 w-full border-b h-14 bg-background text-foreground">
            <div className="p-4 w-full flex justify-between">
                {backButton ? <ChevronLeft size={30} onClick={() => router.back()} className='cursor-pointer' /> : <div />}
                <span className="text-xl flex gap-1">{name}</span>
                <div className='w-10 h-auto'>
                    {icon2 ? icon2 : <></>}
                </div>
            </div>
        </div>
    )
}, ((prevProps: any, nextProps: any) => {
    return prevProps.name === nextProps.name && prevProps.isProfile === nextProps.isProfile
}))