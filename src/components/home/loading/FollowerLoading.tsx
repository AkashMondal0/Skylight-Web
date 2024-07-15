import React from 'react'
import { SkeletonUserCard } from './UserCard'

const FollowPageLoading = () => {
    return (
        <div>
            <div className='flex-col gap-2 flex'>
                {Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}
            </div>
        </div>
    )
}

export default FollowPageLoading
