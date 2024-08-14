import React, { memo } from 'react'
import { cn } from '@/lib/utils'
import OptimizedImage from './SkyImage'

const SkyAvatar = memo(function ProfileHeader({
    url = "/user.jpg",
    className,
    border = false,
}:
    {
        url?: string | null,
        className: string
        border?: boolean
        sizeImage?: string
    }) {
    return <div>
        <div className={cn('sky-gradient w-auto h-auto rounded-full border',
            border ? "gradient p-[4px]" : "p-[2px]",className)}>
            <OptimizedImage
                src={url || "/user.jpg"}
                width={50}
                height={50}
                showErrorIconSm
                alt="Picture of the author"
                sizes={"(min-width: 808px) 20vw, 30vw"}
                fetchPriority="high"
                className={cn(`w-full h-full cursor-pointer 
            rounded-full userNotSelectImg bg-muted 
            object-cover p-0`)} />
        </div>
    </div>
}, ((prevProps: any, nextProps: any) => {
    return prevProps.url === nextProps.url
}))

export default SkyAvatar
