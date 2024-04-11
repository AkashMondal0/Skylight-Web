/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Button } from '@/components/ui/button'
import { Link2, Plus, Settings } from 'lucide-react'
import React from 'react'
import OptionAvatarDialog from './dialog/options'
import { useRouter } from 'next/navigation'
import FollowingDialog from './dialog/followings'
import FollowersDialog from './dialog/followers'

const Page = () => {
  const router = useRouter()

  const data = {
    user: {
      email: 'akashmondal',
      name: 'Akash Mondal',
      avatar: 'https://github.com/shadcn.png',
      posts: [
        {
          images: ['https://github.com/shadcn.png']
        },
        {
          images: ['https://github.com/shadcn.png']
        }, {
          images: ['https://github.com/shadcn.png']
        }, {
          images: ['https://github.com/shadcn.png']
        }, {
          images: ['https://github.com/shadcn.png']
        }, {
          images: ['https://github.com/shadcn.png']
        }, {
          images: ['https://github.com/shadcn.png']
        }, {
          images: ['https://github.com/shadcn.png']
        },
      ],
      followers: [
        {
          name: 'John Doe',
          avatar: 'https://github.com/shadcn.png'
        }
      ],
      following: [
        {
          name: 'Jane Doe',
          avatar: 'https://github.com/shadcn.png'
        }
      ]
    }
  }

  const followers = () => {
    router.push('/profile/akashmondal0/follower')
  }
  const following = () => {
    router.push('/profile/akashmondal0/following')
  }

  return (
    <div className='w-full min-h-[100dvh]'>
      <div className='mx-auto max-w-[960px]'>

        {/* md ->>> */}
        <div className="hidden sm:block">
          {/* profile header */}
          <div className='flex items-center my-8 m-5'>
            <OptionAvatarDialog>
              <img src={data.user.avatar} className='sm:w-36 object-cover 
              bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8 cursor-pointer' />
            </OptionAvatarDialog>
            <div className='flex flex-col justify-between gap-5'>
              <div className='flex justify-between gap-2 items-center'>
                <p className='text-xl px-3'>{data?.user.email}</p>
                <Button variant={"secondary"} className='rounded-xl' onClick={() => {
                  router.push('/account/edit')
                }}>
                  Edit Profile
                </Button>
                <Button variant={"secondary"} className='rounded-xl' onClick={() => {
                  router.push('/account/archive')
                }}>
                  View Archive
                </Button>
                <Settings className='w-8 h-8 cursor-pointer' />
              </div>

              <div className='flex justify-between px-3'>
                <div className='flex gap-1'>
                  <p className='text-base font-semibold'>
                    {data?.user.posts.length}
                  </p> posts
                </div>
                <FollowersDialog>
                  <div className='sm:cursor-pointer flex gap-1'>
                    <p className='text-base font-semibold'>
                      {data?.user.followers.length}
                    </p>
                    followers
                  </div>
                </FollowersDialog>
                <FollowingDialog>
                  <div className='sm:cursor-pointer flex gap-1'>
                    <p className='text-base font-semibold'>
                      {data?.user.following.length}
                    </p>
                    following
                  </div>
                </FollowingDialog>
              </div>

              <div className='flex justify-between flex-col px-3 my-4'>
                <p className='font-semibold'>{data?.user.name}</p>
                <p>!null</p>
                <a className='flex items-center gap-2 hover:underline font-semibold text-sm'
                  target='_blank'
                  href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
                  <Link2 className='rotate-45' />
                  https://www.linkedin.com/in/akash-mondal-b5a712231/
                </a>
              </div>
            </div>
          </div>
          {/* story */}
          <div className='flex gap-10 m-5 my-10'>
            <img src={data?.user.avatar || 'https://github.com/shadcn.png'} className='w-20 h-20 rounded-full object-cover cursor-pointer' />
            <div className='w-20 h-20 border-[2px] rounded-full flex justify-center items-center cursor-pointer'>
              <Plus className='w-16 h-16' />
            </div>
          </div>
          {/* post */}
          <div className="grid grid-cols-3 gap-2">
            {data?.user.posts.map((post, index) => (
              <img key={index} src={post.images[0]} className='w-80 h-80 object-cover ' />
            ))}
          </div>
          <div className='h-10 w-full'></div>
        </div>

        {/* <<<- sm */}
        <div className='sm:hidden'>
          {/* profile header */}
          <div className='flex gap-3 my-5 items-center px-2'>
            <img src={data?.user.avatar || 'https://github.com/shadcn.png'}
              className='w-24 h-24 rounded-full object-cover bg-slate-400' />
            <div className='flex flex-col gap-4'>
              <div className='flex gap-2'>
                <p className='text-xl px-3'>{data?.user.email}</p>
              </div>
              <div className='flex justify-between gap-2 px-3'>
                <Button variant={"secondary"} className='rounded-xl' onClick={() => {
                  router.push('/account/edit')
                }}>
                  Edit Profile
                </Button>
                <Button variant={"secondary"} className='rounded-xl' onClick={() => {
                  router.push('/account/archive')
                }}>
                  View Archive
                </Button>
              </div>
            </div>
          </div>
          {/*  */}
          <>
            <div className='flex justify-between flex-col px-3'>
              <p>{data?.user.name}</p>
              <p>!null</p>
              <a className='flex items-center gap-2
             hover:underline font-semibold text-sm'
                target='_blank'
                href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
                <Link2 className='rotate-45' />
                https://www.linkedin.com/in/akash-mondal-b5a712231/
              </a>
            </div>

            {/* stories */}
            <div className='flex gap-5 my-5 px-2'>
              <img src={data?.user.avatar || 'https://github.com/shadcn.png'} className='w-16 h-16 rounded-full cursor-pointer' />
              <div className='w-16 h-16 border-[2px] rounded-full flex justify-center items-center cursor-pointer'>
                <Plus className='w-10 h-10' />
              </div>
            </div>

            {/* followers and following */}
            <div className='flex justify-around p-2 border-y'>
              <div className=' text-center'>
                <p className='text-base font-semibold'>
                  {data?.user.posts.length}
                </p>
                <div>
                  posts
                </div>
              </div>

              <div className='sm:sm:cursor-pointer text-center' onClick={followers}>
                <p className='text-base font-semibold'>
                  {data?.user.followers.length}
                </p>
                <div>
                  followers
                </div>
              </div>

              <div className='sm:sm:cursor-pointer text-center' onClick={following}>
                <p className='text-base font-semibold'>
                  {data?.user.following.length}
                </p>
                <div>
                  following
                </div>
              </div>

            </div>

          </>
          {/* posts */}
          <div className="grid grid-cols-3 gap-1 w-full">
            {data?.user.posts.map((post, index) => (
              <img key={index} src={post.images[0]} className='max-h-md w-full object-cover' />
            ))}
          </div>
          <div className='h-10 w-full'></div>
        </div>

      </div>
    </div >
  )
}

export default Page
