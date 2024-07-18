import Link from 'next/link'
import { Link2 } from 'lucide-react'
import { User } from '@/types'
import SkyAvatar from '@/components/sky/SkyAvatar'
import StoriesComponent from './Stories'
import FollowAndUnFollowButton from './FollowButton'


interface Props {
    isProfile: boolean
    user: User | null
}
const HeroSection = ({
    isProfile,
    user: userProfileData,
}: Props) => {

    if (!userProfileData) return null

    return (
        <>
            {/* large device */}
            <div className="hidden sm:block mx-auto max-w-[960px]">
                {/* profile header */}
                <div className='flex items-center my-8 m-5'>
                    <SkyAvatar
                        sizeImage='20vw'
                        url={userProfileData.profilePicture || "/user.jpg"}
                        className={'sm:w-36 object-cover bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8'} />
                    <div className='flex flex-col justify-between gap-5'>
                        <FollowAndUnFollowButton
                            isFollowing={userProfileData.friendship.following}
                            user={userProfileData}
                            isProfile={isProfile} />
                        <div className='flex justify-between px-3'>
                            <div className='flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {userProfileData.postCount}
                                </p> posts
                            </div>
                            <Link href={`/${userProfileData.username.toString() ?? ""}/follower`} className='sm:cursor-pointer flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {userProfileData.followerCount}
                                </p>
                                followers
                            </Link>
                            <Link href={`/${userProfileData.username.toString() ?? ""}/following`} className='sm:cursor-pointer flex gap-1'>
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
            </div>
            {/* small device */}
            <div className='sm:hidden block'>
                {/* profile header */}
                <div className='flex gap-3 my-5 items-center px-2'>
                    <SkyAvatar url={userProfileData.profilePicture || "/user.jpg"}
                        className={'w-24 h-24 rounded-full object-cover bg-slate-400'} />
                    <FollowAndUnFollowButton
                        isFollowing={userProfileData.friendship.following}
                        user={userProfileData}
                        isProfile={isProfile} />
                </div>
                {/* name or links and users count */}
                <>
                    <div className='flex justify-between flex-col px-3'>
                        <p className='font-semibold'>{userProfileData.username}</p>
                        <p>!null</p>
                        <div className='flex'>
                            <a className='flex items-center gap-2 hover:underline font-semibold text-sm'
                                target='_blank'
                                href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
                                <Link2 className='rotate-45' />
                                <p className='truncate w-60'>{`https://www.linkedin.com/in/akash-mondal-b5a712231/`}</p>
                            </a>
                        </div>
                    </div>
                    <StoriesComponent user={userProfileData} />
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

                        <Link className='cursor-pointer text-center' href={`/${userProfileData.username.toString() ?? ""}/follower`}>
                            <p className='text-base font-semibold'>
                                {userProfileData.followerCount}
                            </p>
                            <div>
                                followers
                            </div>
                        </Link>

                        <Link className='cursor-pointer text-center' href={`/${userProfileData.username.toString() ?? ""}/following`}>
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