import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const SkyAvatar = ({
    url,
    className,
}:
    {
        url: string | null,
        className: string
        sizeImage?: string
    }) => {
    return <Image
        src={url || "/user.jpg"}
        width={50}
        height={50}
        alt="Picture of the author"
        sizes={"(min-width: 808px) 20vw, 30vw"}
        quality={75}
        priority={true}
        style={{
            objectFit: 'cover',
        }}
        fetchPriority="high"
        className={cn('w-12 h-12 cursor-pointer rounded-full userNotSelectImg bg-muted', className)}
    />
}

export default SkyAvatar
