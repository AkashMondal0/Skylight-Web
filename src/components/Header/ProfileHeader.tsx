import { AtSign, ChevronDown, Settings } from 'lucide-react'
import React, { memo, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import FollowButton from '@/components/Button/FollowButton'
import { useSession } from 'next-auth/react'
import { ProfileStories } from '@/components/Stories/ProfileStories'
import { fetchUserProfilePostsApi } from '@/redux/services/profile'


export const ProfileHeader = memo(function ProfileHeader() {
    const session = useSession().data?.user
    const dispatch = useDispatch()
    const profileUser = useSelector((Root: RootState) => Root.profile)
    const isProfile = useMemo(() => session?.username === profileUser.state?.id, [session?.username])


    useEffect(() => {
        if (profileUser.state?.username) {
            dispatch(fetchUserProfilePostsApi({
                username: profileUser.state?.username,
                limit: 12,
                offset: 0
            }) as any)
        }
        // dispatch(setLoadMoreProfilePosts(_posts))
    }, [profileUser.state?.username])

    if (!profileUser.state) return <></>

    return (
        <>
            <ProfileNavbar name='username' />
            {/* <ProfileHeader /> */}
            {/* large device */}
            <div className="hidden sm:block mx-auto max-w-[960px]">
                {/* profile header */}
                <div className='flex items-center my-8 m-5'>
                    <SkyAvatar
                        sizeImage='20vw'
                        url={profileUser.state.profilePicture || "/user.jpg"}
                        className={'sm:w-36 object-cover bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8'} />
                    <div className='flex flex-col justify-between gap-5'>
                        <FollowButton
                            isFollowing={profileUser.state.friendship.following}
                            user={profileUser.state}
                            isProfile={isProfile} />
                        <div className='flex justify-between px-3'>
                            <div className='flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {profileUser.state.postCount}
                                </p> posts
                            </div>
                            <Link href={`/${profileUser.state.username.toString() ?? ""}/follower`} className='sm:cursor-pointer flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {profileUser.state.followerCount}
                                </p>
                                followers
                            </Link>
                            <Link href={`/${profileUser.state.username.toString() ?? ""}/following`} className='sm:cursor-pointer flex gap-1'>
                                <p className='text-base font-semibold'>
                                    {profileUser.state.followingCount}
                                </p>
                                following
                            </Link>
                        </div>

                        <div className='flex justify-between flex-col px-3 my-4'>
                            <p className='font-semibold'>{profileUser.state.username}</p>
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
                <ProfileStories user={profileUser.state} />
            </div>
            {/* small device */}
            <div className='sm:hidden block'>
                {/* profile header */}
                <div className='flex gap-3 my-5 items-center px-2'>
                    <SkyAvatar url={profileUser.state.profilePicture || "/user.jpg"}
                        className={'w-24 h-24 rounded-full object-cover bg-slate-400'} />
                    <FollowButton
                        isFollowing={profileUser.state.friendship.following}
                        user={profileUser.state}
                        isProfile={isProfile} />
                </div>
                {/* name or links and users count */}
                <>
                    <div className='flex justify-between flex-col px-3'>
                        <p className='font-semibold'>{profileUser.state.username}</p>
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
                    <ProfileStories user={profileUser.state} />
                    {/* followers and following */}
                    <div className='flex justify-around p-2 border-y'>
                        <div className=' text-center'>
                            <p className='text-base font-semibold'>
                                {profileUser.state.postCount}
                            </p>
                            <div>
                                posts
                            </div>
                        </div>

                        <Link className='cursor-pointer text-center' href={`/${profileUser.state.username.toString() ?? ""}/follower`}>
                            <p className='text-base font-semibold'>
                                {profileUser.state.followerCount}
                            </p>
                            <div>
                                followers
                            </div>
                        </Link>

                        <Link className='cursor-pointer text-center' href={`/${profileUser.state.username.toString() ?? ""}/following`}>
                            <p className='text-base font-semibold'>
                                {profileUser.state.followingCount}
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
})


export const ProfileNavbar = memo(function ProfileHeader({ name, isProfile }: { name: string, isProfile?: boolean }) {

    return (
        <div className="md:hidden flex sticky top-0 z-10 w-full border-b h-14 bg-background text-foreground">
            <div className="p-4 w-full flex justify-between">
                <AtSign size={28} />
                <span className="text-xl flex gap-1">{name} <ChevronDown className='mt-1' /></span>
                <Settings size={28} />
            </div>
        </div>
    )
})