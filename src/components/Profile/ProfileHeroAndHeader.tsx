import { AtSign, ChevronDown, Settings } from 'lucide-react'
import React, { memo } from 'react'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import SkyAvatar from '@/components/sky/SkyAvatar'
import { ProfileStories } from '@/components/Profile/ProfileStories'
import OptionAvatarDialog from '../Dialog/Avatar.Options.Dialog'
import { User } from '@/types'
import { ProfileFollowButton } from '.'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux-stores/store'

export const ProfileHero = memo(function ProfileHero({ profileUser, isProfile }: { profileUser: User | null, isProfile: boolean }) {
    const session = useSelector((Root: RootState) => Root.AccountState.session)

    if (!profileUser) return <></>

    return (
        <>
            <div className='md:max-w-[960px] mx-auto'>
                {/* large device */}
                <div className="hidden md:block mx-auto">
                    {/* profile hero */}
                    <div className='flex my-10 justify-around w-full'>
                        <div className='flex items-center gap-5'>
                            {/* avatar */}
                            <div>
                                {isProfile ?
                                    <OptionAvatarDialog>
                                        <SkyAvatar
                                            sizeImage='20vw'
                                            url={profileUser.profilePicture === session?.profilePicture ? profileUser.profilePicture : session?.profilePicture}
                                            className={`sm:w-36 sm:h-36 lg:w-44 lg:h-44 
                                    w-16 h-16 rounded-full aspect-square`} />
                                    </OptionAvatarDialog> :
                                    <SkyAvatar
                                        sizeImage='20vw'
                                        url={profileUser.profilePicture}
                                        className={`sm:w-36 sm:h-36 lg:w-44 lg:h-44 
                                    w-16 h-16 rounded-full aspect-square`} />}
                            </div>
                            {/* right */}
                            <div>
                                <div className='flex flex-col gap-5'>
                                    {/* follow button */}
                                    <ProfileFollowButton
                                        isProfile={isProfile}
                                        user={profileUser} />
                                    {/* profile details */}
                                    <div className='sm:flex hidden justify-between px-3 w-max gap-11'>
                                        <div className='flex gap-1 w-max'>
                                            <p className='text-base font-semibold'>
                                                {profileUser.postCount}
                                            </p> posts
                                        </div>
                                        <Link href={`/${profileUser.username.toString() ?? ""}/follower`}
                                            className='sm:cursor-pointer flex gap-1  w-max'>
                                            <p className='text-base font-semibold'>
                                                {profileUser.followerCount}
                                            </p>
                                            followers
                                        </Link>
                                        <Link href={`/${profileUser.username.toString() ?? ""}/following`}
                                            className='sm:cursor-pointer flex gap-1  w-max'>
                                            <p className='text-base font-semibold'>
                                                {profileUser.followingCount}
                                            </p>
                                            following
                                        </Link>
                                    </div>
                                    {/* profile descriptions */}
                                    <div className='flex justify-between flex-col px-3 my-4'>
                                        <p className='font-semibold w-80 truncate'>{profileUser.username}</p>
                                        <p className='w-80 line-clamp-1'>{"pubic"}</p>
                                        <p className='w-80 line-clamp-1'>{profileUser.bio}</p>
                                        {/* website */}
                                        {
                                            profileUser.website.length > 0 &&
                                            <div className='flex gap-1'>
                                                <Link2 className='rotate-45' />
                                                <a className='flex items-center gap-2 hover:underline font-semibold text-sm w-80 line-clamp-1'
                                                    target='_blank' href={profileUser.website[0]}>
                                                    {profileUser.website[0]} + {`${profileUser.website.length - 1} more`}
                                                </a>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div />
                        <div />
                    </div>
                    {/* story */}
                    {profileUser.isPrivate ? <></> : < ProfileStories user={profileUser} isProfile={isProfile} />}
                    <div className='border-t my-5 mx-2'></div>
                </div>
                {/* small device */}
                <div className='md:hidden block'>
                    <div className='h-5' />
                    {/* profile header */}
                    <div className='flex gap-3 my-5 items-center px-2'>
                        <SkyAvatar url={isProfile ? session?.profilePicture : profileUser.profilePicture}
                            className={'w-24 h-24 rounded-full object-cover'} />
                        {/* followers and following */}
                        <ProfileFollowButton
                            isProfile={isProfile}
                            user={profileUser} />
                    </div>
                    <>
                        {/* profile descriptions */}
                        <div className='flex justify-between flex-col px-3 my-4'>
                            <p className='font-semibold w-80 truncate'>{profileUser.username}</p>
                            <p className='w-80 line-clamp-1'>{"pubic"}</p>
                            <p className='w-80 line-clamp-1'>{profileUser.bio}</p>
                            {/* website */}
                            {
                                profileUser.website.length > 0 &&
                                <div className='flex gap-1'>
                                    <Link2 className='rotate-45' />
                                    <a className='flex items-center gap-2 hover:underline font-semibold text-sm w-80 line-clamp-1'
                                        target='_blank' href={profileUser.website[0]}>
                                        {profileUser.website[0]} + {`${profileUser.website.length - 1} more`}
                                    </a>
                                </div>
                            }
                        </div>
                        {profileUser.isPrivate ? <></> : < ProfileStories user={profileUser} isProfile={isProfile} />}
                        {/* name or links and users count */}
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
