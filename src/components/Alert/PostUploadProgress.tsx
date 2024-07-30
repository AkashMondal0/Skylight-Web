'use client'
import React from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { HardDriveUpload, Loader2 } from 'lucide-react'
import OptimizedImage from '@/components/sky/SkyImage'

export const PostUploadProgress = () => {
    const profile = useSelector((Root: RootState) => Root.account)
    if (!profile.UploadFiles.loading) return null
    return (
        <div className='w-full max-w-[480px] h-16 mx-auto 
        flex items-center border-y px-2'>
            <div className='flex-1 flex gap-2 pr-4'>
                <HardDriveUpload className="h-10 w-10 rounded-md" />
                <div className='w-full space-y-2'>
                    <p className='text-lg font-semibold'>Upload a post</p>
                    <div className='loader'></div>
                </div>
            </div>

            {profile.UploadFiles.currentUploadImg ?
                <div className='w-10'>
                    <OptimizedImage
                        width={20}
                        height={20}
                        sizes="10vw"
                        src={profile.UploadFiles.currentUploadImg ?? "/user.jpg"}
                        alt='User profile picture'
                        className="w-10 h-10 object-cover rounded-xl animate-pulse" />
                </div>
                : <>
                    <Loader2 className="h-10 w-10 animate-spin rounded-md" />
                </>}
        </div>
    )
}
