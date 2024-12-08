"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

const ExploreUserCard = ({
  url
}: {
  url?: string
}) => {
  return (
    <div>
      <div className='flex justify-between px-2 max-w-sm w-72'>
        <div className='flex space-x-2 items-center'>
          <Avatar className='h-10 w-10 mx-auto'>
            <AvatarImage src={url}
              alt="@shadcn" className='rounded-full' />
          </Avatar>
          <div>
            <div className='font-semibold text-base'>Akash Mondal</div>
            <div className='text-sm'>
              suggested for you
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <Link href={"/explore/people"}
            className='text-sm text-blue-500 hover:text-white cursor-pointer hover:opacity-90'>
            Follow
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExploreUserCard