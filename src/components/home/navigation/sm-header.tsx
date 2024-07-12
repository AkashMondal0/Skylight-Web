"use client"
import { CopyPlus, Heart } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import UploadPostDialog from '../dialog/upload-post'
import { configs } from '@/configs'

const Sm_Header = () => {
    const router = useRouter()
    return (
        <div className="md:hidden flex fixed top-0 z-10 w-full
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
}

export default Sm_Header
