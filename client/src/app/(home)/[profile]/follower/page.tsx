"use client";
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FetchFollowersUserDataApi } from '@/redux/slice/users/api-functions';
import { RootState } from '@/redux/store';
import { User } from '@/types';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const id = useParams()
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.users.profileData)

  const FetchFollowingsUser = () => {
    if (id?.profile) {
      dispatch(FetchFollowersUserDataApi({
        profileId: id.profile as string,
        skip: 0,
        size: 12
      }) as any)
    }
  }

  useEffect(() => {
    FetchFollowingsUser()
  }, [])

  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Followers</h1>
        <Separator />
        <div className='h-5' />
        {users.fetchFollow.followers.map((user, i) => <UserCard key={i} user={user} />)}
      </div>
    </div>
  )
}

export default Page


const UserCard = ({
  user,
  action
}: {
  user: User
  action?: () => void
}) => {
  if (!user) return null
  return (
    <>
      <div className='flex justify-between px-2 my-4'>
        <div className='flex space-x-2 items-center'>
          <Avatar className='h-10 w-10 mx-auto'>
            <AvatarImage src={user.profilePicture || "/user.jpg"}
              alt="@sky" className='rounded-full' />
          </Avatar>
          <div>
            <div className='font-semibold text-base'>
              {user.username}
            </div>
            <div className='text-sm'>
              {user.email}
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <Button variant={"secondary"} className=" rounded-xl" onClick={action}>
            Remove
          </Button>
        </div>
      </div>
    </>
  )
}