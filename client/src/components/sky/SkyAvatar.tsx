import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const SkyAvatar = ({
    url,
    className,
    sizeImage,
}:
    {
        url: string | null,
        className: string
        sizeImage?: string
    }) => {
    return <Image
        src={url || "/user.jpg"}
        width={40}
        height={40}
        alt="Picture of the author"
        quality={100}
        sizes={"(min-width: 808px) 50vw, 100vw"}
        loading="lazy"
        // (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw
        style={{
            objectFit: 'cover', // cover, contain, none
        }}
        fetchPriority="high"
        className={cn('w-12 h-12 cursor-pointer rounded-full userNotSelectImg bg-muted', className)}
    />
}

export default SkyAvatar
