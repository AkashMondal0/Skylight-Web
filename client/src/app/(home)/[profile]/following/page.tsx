import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full flex justify-center min-h-[100dvh] h-full'>
      <div className='max-w-[600px] w-full p-4'>
        <h1 className="font-semibold text-lg text-center mb-4">Followings</h1>
        <Separator/>
        <div className='h-5'/>
        {[...Array(50)].map((_, i) => <UserCard key={i} />)}
      </div>
    </div>
  )
}

export default Page

const UserCard = ({
  url = "https://github.com/shadcn.png",
}: {
  url?: string
}) => {
  return (
      <>
          <div className='flex justify-between px-2 my-4'>
              <div className='flex space-x-2 items-center'>
                  <Avatar className='h-12 w-12 mx-auto'>
                      <AvatarImage src={url}
                          alt="@shadcn" className='rounded-full' />
                  </Avatar>
                  <div>
                      <div className='font-semibold text-base'>akashmondal0</div>
                      <div className='text-sm'>
                          Akash Mondal
                      </div>
                  </div>
              </div>
              <div className='flex items-center'>
                  <Button variant={"secondary"} className=" rounded-xl">
                      Remove
                  </Button>
              </div>
          </div>
      </>
  )
}