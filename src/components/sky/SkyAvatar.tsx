import React, { memo } from 'react'
import { cn } from '@/lib/utils'
import OptimizedImage from './SkyImage'

const SkyAvatar = memo(function ProfileHeader({
    url,
    className,
}:
    {
        url: string | null,
        className: string
        sizeImage?: string
    }) {
    return <div>
        <OptimizedImage
            src={url || "/user.jpg"}
            width={50}
            height={50}
            showErrorIconSm
            alt="Picture of the author"
            sizes={"(min-width: 808px) 20vw, 30vw"}
            fetchPriority="high"
            className={cn('w-12 h-12 cursor-pointer rounded-full userNotSelectImg bg-muted object-cover', className)}
        />
    </div>
}, ((prevProps: any, nextProps: any) => {
    return prevProps.url === nextProps.url
}))

export default SkyAvatar
