'use client'
import React from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { HardDriveUpload, Loader2 } from 'lucide-react'
import Image from 'next/image'
const ShowUpload = () => {
    const profile = useSelector((Root: RootState)=> Root.account)
    if (!profile.UploadFiles.loading) return null
    return (
        <div className='w-full max-w-[480px] h-16 mx-auto flex items-center border-y space-x-4 px-4'>
            <HardDriveUpload className="h-10 w-10 animate-pulse rounded-md" />
            <div className='w-full space-y-2'>
                <p className='text-lg font-semibold'>Upload a post</p>
                <div className='loader'></div>
            </div>
            <>
                {profile.UploadFiles.currentUploadImg ?
                    <Image
                        width={20}
                        height={20}
                        sizes="10vw"
                        loading='lazy'
                        src={profile.UploadFiles.currentUploadImg ?? "/user.jpg"}
                        alt='User profile picture'
                        className="w-10 h-10 object-cover rounded-xl"
                    /> : <>
                        <Loader2 className="h-10 w-10 animate-spin rounded-md" />
                    </>
                }
            </>
        </div>
    )
}

export default ShowUpload
