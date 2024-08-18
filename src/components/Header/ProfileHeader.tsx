import { AtSign, ChevronDown, Settings } from 'lucide-react'
import React, { memo, useEffect } from 'react'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { useDispatch } from 'react-redux'
import FollowButton from '@/components/Button/FollowButton'
import { ProfileStories } from '@/components/Stories/ProfileStories'
import { fetchUserProfilePostsApi } from '@/redux/services/profile'
import { useSession } from 'next-auth/react'
import OptionAvatarDialog from '../Dialog/Avatar.Options.Dialog'
import { User } from '@/types'
let profileUsername = "no_username"

export const ProfileHeader = memo(function ProfileHeader({ profileUser, isProfile }: { profileUser: User | null, isProfile: boolean }) {
    const dispatch = useDispatch()
    const session = useSession().data?.user

    useEffect(() => {
        if (profileUser?.username && profileUser?.username !== profileUsername) {
            profileUsername = profileUser.username
            dispatch(fetchUserProfilePostsApi({
                username: profileUser?.id,
                limit: 12,
                offset: 0
            }) as any)
        }
    }, [profileUser?.username, profileUser?.id])

    if (!profileUser) return <></>

    return (
        <>
            <div className='md:max-w-[960px] mx-auto'>
                {/* large device */}
                <div className="hidden md:block mx-auto">
                    {/* profile header */}
                    <div className='flex items-center my-8 md:px-10 sm:px-2 gap-5'>
                        <div>
                            {isProfile ?
                                <OptionAvatarDialog>
                                    <SkyAvatar
                                        sizeImage='20vw'
                                        url={session?.image || "/user.jpg"}
                                        className={'sm:w-36 sm:h-36 w-16 h-16 rounded-full aspect-square'} />
                                </OptionAvatarDialog>
                                :
                                <SkyAvatar
                                    sizeImage='20vw'
                                    url={profileUser.profilePicture || "/user.jpg"}
                                    className={'sm:w-36 sm:h-36 w-16 h-16 rounded-full aspect-square'} />}
                        </div>
                        <div className='flex flex-col justify-between gap-5'>
                            <FollowButton
                                isProfile={isProfile}
                                isFollowing={profileUser?.friendship?.following}
                                user={profileUser} />
                            <div className='sm:flex hidden justify-between px-3'>
                                <div className='flex gap-1'>
                                    <p className='text-base font-semibold'>
                                        {profileUser.postCount}
                                    </p> posts
                                </div>
                                <Link href={`/${profileUser.username.toString() ?? ""}/follower`} className='sm:cursor-pointer flex gap-1'>
                                    <p className='text-base font-semibold'>
                                        {profileUser.followerCount}
                                    </p>
                                    followers
                                </Link>
                                <Link href={`/${profileUser.username.toString() ?? ""}/following`} className='sm:cursor-pointer flex gap-1'>
                                    <p className='text-base font-semibold'>
                                        {profileUser.followingCount}
                                    </p>
                                    following
                                </Link>
                            </div>
                            <div className='flex justify-between flex-col px-3 my-4'>
                                <p className='font-semibold w-80 truncate'>{profileUser.username}</p>
                                <p className='w-80 line-clamp-1'>{profileUser.bio}</p>
                                {profileUser?.website ?
                                    <div className='flex gap-1'>
                                        <Link2 className='rotate-45' />
                                        <a className='flex items-center gap-2 hover:underline font-semibold text-sm w-80 line-clamp-1'
                                            target='_blank' href={profileUser.website[0]}>
                                            {profileUser.website[0]}
                                        </a>
                                    </div>
                                    : <></>}
                            </div>
                        </div>
                    </div>
                    {/* story */}
                    <ProfileStories user={profileUser} isProfile={isProfile} />
                    <div className='border-t my-5 mx-2'></div>
                </div>
                {/* small device */}
                <div className='md:hidden block px-2'>
                    {/* profile header */}
                    <div className='flex gap-3 my-5 items-center px-2'>
                        <SkyAvatar url={isProfile ? session?.image : profileUser.profilePicture}
                            className={'w-24 h-24 rounded-full object-cover'} />
                        <FollowButton
                            isProfile={isProfile}
                            isFollowing={profileUser.friendship.following}
                            user={profileUser} />
                    </div>
                    {/* name or links and users count */}
                    <>
                        <div className='flex justify-between flex-col px-3 my-4'>
                            <p className='font-semibold w-80 truncate'>{profileUser.username}</p>
                            <p className='w-80 line-clamp-1'>{profileUser.bio}</p>
                            {profileUser?.website ?
                                <div className='flex gap-1'>
                                    <Link2 className='rotate-45' />
                                    <a className='flex items-center gap-2 hover:underline font-semibold text-sm w-80 line-clamp-1'
                                        target='_blank' href={profileUser.website[0]}>
                                        {profileUser.website[0]}
                                    </a>
                                </div>
                                : <></>}
                        </div>
                        <ProfileStories
                            isProfile={isProfile}
                            user={profileUser} />
                        {/* followers and following */}
                        <div className='flex justify-around p-2 border-y md:hidden'>
                            <div className=' text-center'>
                                <p className='text-base font-semibold'>
                                    {profileUser.postCount}
                                </p>
                                <div>
                                    posts
                                </div>
                            </div>

                            <Link className='cursor-pointer text-center' href={`/${profileUser.username.toString() ?? ""}/follower`}>
                                <p className='text-base font-semibold'>
                                    {profileUser.followerCount}
                                </p>
                                <div>
                                    followers
                                </div>
                            </Link>

                            <Link className='cursor-pointer text-center' href={`/${profileUser.username.toString() ?? ""}/following`}>
                                <p className='text-base font-semibold'>
                                    {profileUser.followingCount}
                                </p>
                                <div>
                                    following
                                </div>
                            </Link>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}, ((prevProps, nextProps) => {
    return prevProps.profileUser?.id === nextProps.profileUser?.id
        && prevProps.isProfile === nextProps.isProfile
        && prevProps.profileUser?.friendship.following === nextProps.profileUser?.friendship.following
}))


export const ProfileNavbar = memo(function ProfileHeader({ name = "Not Found", isProfile }: { name?: string, isProfile?: boolean }) {
    return (
        <div className="md:hidden flex sticky top-0 z-10 w-full border-b h-14 bg-background text-foreground">
            <div className="p-4 w-full flex justify-between">
                <AtSign size={28} />
                <span className="text-xl flex gap-1">{name} <ChevronDown className='mt-1' /></span>
                <Link href={"/account/edit"}>
                    <Settings size={28} />
                </Link>
            </div>
        </div>
    )
}, ((prevProps: any, nextProps: any) => {
    return prevProps.name === nextProps.name && prevProps.isProfile === nextProps.isProfile
}))
