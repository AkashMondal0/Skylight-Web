import SkyAvatar from '@/components/sky/SkyAvatar'
import { User } from '@/types'
import React, { memo } from 'react'
import { UploadYourStory } from './StoryItem'

export const ProfileStories = memo(function ProfileStories({
  user
}: {
  user: User
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  return (
    <div className='flex sm:gap-10 m-5 sm:my-10 gap-5 my-5'>
      <UploadYourStory className='sm:w-20 sm:h-20 w-16 h-16 border-[2px]' />
      {/* <SkyAvatar
        sizeImage='10vw'
        url={user.profilePicture || "/user.jpg"}
        className={'sm:w-20 sm:h-20 rounded-full object-cover cursor-pointer h-16 w-16'} /> */}
    </div>
  )
}, (() => true))
