import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const SkyAvatar = ({
    url, className
}:
    { url: string, className: string }) => {
    return <Image
        src={url}
        width={40}
        height={40}
        alt="Picture of the author"
        quality={100}
        sizes="(min-width: 808px) 10vw, 20vw"
        // (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw
        style={{
            objectFit: 'cover', // cover, contain, none
        }}
        priority={true}
        className={cn('w-12 h-12 cursor-pointer rounded-full userNotSelectImg bg-muted', className)}
    />
}

export default SkyAvatar
