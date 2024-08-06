import SkyAvatar from '@/components/sky/SkyAvatar'
import { User } from '@/types'
import React, { memo, useMemo } from 'react'
import { UploadYourStory } from './StoryItem'
import { useSession } from 'next-auth/react'

export const ProfileStories = memo(function ProfileStories({
  user,
  isProfile
}: {
  user: User,
  isProfile:boolean
}) {
  const session = useSession().data?.user
  return (
    <div className='flex sm:gap-10 m-5 sm:my-10 gap-5 my-5'>
      {isProfile ? <UploadYourStory className='sm:w-20 sm:h-20 w-16 h-16 border-[2px]' /> : <></>}
      <SkyAvatar
        sizeImage='10vw'
        url={user.profilePicture}
        className={'sm:w-20 sm:h-20 rounded-full object-cover cursor-pointer h-16 w-16'} />
    </div>
  )
}, ((prevProps: any, nextProps: any) => prevProps.isProfile === nextProps.isProfile))
