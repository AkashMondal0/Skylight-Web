import SkyAvatar from '@/components/sky/SkyAvatar'
import { User } from '@/types'
import React, { memo } from 'react'
import { StoryItem, UploadYourStory } from './StoryItem'

export const ProfileStories = memo(function ProfileStories({
  user,
  isProfile
}: {
  user: User,
  isProfile: boolean
}) {
  return (
    <div className='flex md:gap-10 mx-2 md:my-10 gap-5 my-5'>
      {isProfile ? <UploadYourStory className='md:w-24 md:h-24 w-16 h-16' /> : <></>}
      <StoryItem
        story={{ url: user.profilePicture || '/user.jpg', label: 'Your story' }}
        className={'md:w-24 md:h-24 h-16 w-16'} />
    </div>
  )
}, ((prevProps: any, nextProps: any) => prevProps.isProfile === nextProps.isProfile))
