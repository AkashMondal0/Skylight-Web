import React from 'react'
import { SkeletonUserCardWithButton } from './UserCard'
import { Separator } from '@/components/ui/separator'

export const SkeletonLikedPage = () => {
  return (
    <>
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Likes</h1>
        <Separator />
        <div className='h-5' />
        {Array(10).fill(0).map((_, i) => <SkeletonUserCardWithButton key={i} />)}
      </div>
    </div>
  </>
  )
}

