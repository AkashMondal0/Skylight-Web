import Link from 'next/link'
import { Link2 } from 'lucide-react'
import { User } from '@/types'
import SkyAvatar from '@/components/sky/SkyAvatar'
import StoriesComponent from '../Stories'
import { ActionButtonsLg, ActionButtonsSM } from './button'


interface Props {
    isProfile: boolean
    user: User
}
const HeroSection = ({
    isProfile,
    user: userProfileData,
}: Props) => {
    return (
        <>
            {/* large device */}
            <div className="hidden sm:block mx-auto max-w-[960px]">
                {/* profile header */}
                <div className='flex items-center my-8 m-5'>
                    <SkyAvatar url={userProfileData.profilePicture || "/user.jpg"}
                        className={'sm:w-36 object-cover bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8'} />
                    <div className='flex flex-col justify-between gap-5'>
                        <ActionButtonsLg
                            isFollowing={userProfileData.isFollowing}
                            user={userProfileData}
                            isProfile={isProfile} />
                        <div className='flex justify-between px-3'>
                            <div className='flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {userProfileData.postCount}
                                </p> posts
                            </div>
                            <Link href={`/${userProfileData.username}/followers`} className='sm:cursor-pointer flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {userProfileData.followersCount}
                                </p>
                                followers
                            </Link>
                            <Link href={`/${userProfileData.username}/following`} className='sm:cursor-pointer flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {userProfileData.followingCount}
                                </p>
                                following
                            </Link>
                        </div>

                        <div className='flex justify-between flex-col px-3 my-4'>
                            <p className='font-semibold'>{userProfileData.username}</p>
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
                <StoriesComponent user={userProfileData} />
                {/* post */}
                {/* <PostComponent posts={userProfileData.posts} />
            <div className='h-10 w-full'></div> */}
            </div>
            {/* small device */}
            <div className='sm:hidden block'>
                {/* profile header */}
                <div className='flex gap-3 my-5 items-center px-2'>

                    <SkyAvatar url={userProfileData.profilePicture || "/user.jpg"}
                        className={'w-24 h-24 rounded-full object-cover bg-slate-400'} />

                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <p className='text-xl px-3'>{userProfileData.email}</p>
                        </div>
                        <ActionButtonsSM
                            isFollowing={userProfileData.isFollowing}
                            user={userProfileData}
                            isProfile={isProfile} />
                    </div>
                </div>
                {/*  */}
                <>
                    <div className='flex justify-between flex-col px-3'>
                        <p>{userProfileData.username}</p>
                        <p>!null</p>
                        <a className='flex items-center gap-2 hover:underline font-semibold text-sm'
                            target='_blank'
                            href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
                            <Link2 className='rotate-45' />
                            https://www.linkedin.com/in/akash-mondal-b5a712231/
                        </a>
                    </div>

                    {/* stories */}
                    {/* <Suspense fallback={<>Loading...</>}> */}
                    <StoriesComponent user={userProfileData} />
                    {/* </Suspense> */}

                    {/* followers and following */}
                    <div className='flex justify-around p-2 border-y'>
                        <div className=' text-center'>
                            <p className='text-base font-semibold'>
                                {userProfileData.postCount}
                            </p>
                            <div>
                                posts
                            </div>
                        </div>

                        <Link className='cursor-pointer text-center' href={`/${userProfileData.username}/follower`}>
                            <p className='text-base font-semibold'>
                                {userProfileData.followersCount}
                            </p>
                            <div>
                                followers
                            </div>
                        </Link>

                        <Link className='cursor-pointer text-center' href={`/${userProfileData.username}/following`}>
                            <p className='text-base font-semibold'>
                                {userProfileData.followingCount}
                            </p>
                            <div>
                                following
                            </div>
                        </Link>

                    </div>

                </>
            </div>
        </>

    )
}

export default HeroSection