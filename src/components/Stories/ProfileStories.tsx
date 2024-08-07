import SkyAvatar from '@/components/sky/SkyAvatar'
import { User } from '@/types'
import React, { memo } from 'react'
import { UploadYourStory } from './StoryItem'
import { useSession } from 'next-auth/react'

export const ProfileStories = memo(function ProfileStories({
  user,
  isProfile
}: {
  user: User,
  isProfile: boolean
}) {
  const session = useSession().data?.user
  return (
    <div className='flex md:gap-10 mx-2 md:my-10 gap-5 my-5'>
      {isProfile ? <UploadYourStory className='md:w-24 md:h-24 w-16 h-16 border-[2px] rounded-full object-cover cursor-pointer' /> : <></>}
      <SkyAvatar
        sizeImage='10vw'
        url={user.profilePicture}
        className={'md:w-24 md:h-24 h-16 w-16 border-[2px] rounded-full object-cover cursor-pointer'} />
    </div>
  )
}, ((prevProps: any, nextProps: any) => prevProps.isProfile === nextProps.isProfile))
