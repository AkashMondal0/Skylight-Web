// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable jsx-a11y/alt-text */
// 'use client'
// import { Button } from '@/components/ui/button'
// import { Link2, Plus, Settings } from 'lucide-react'
// import React, { useEffect, useMemo, useRef } from 'react'
// import OptionAvatarDialog from './dialog/options'
// import { useRouter } from 'next/navigation'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/redux/store'
// import { FetchUserProfileDataApi, UserFollowingApi, UserUnFollowingApi } from '@/redux/slice/users/api-functions'
// import SkeletonProfile from './skeleton'
// import { User } from '@/types'

// const Page = ({ params }: { params: { profile: string } }) => {
//     const router = useRouter()
//     const dispatch = useDispatch()
//     const users = useSelector((state: RootState) => state.users)
//     const profile = useSelector((state: RootState) => state.profile)
//     const loadedRef = useRef(false)
//     const userProfileData = useMemo(() => users.profileData.user, [users.profileData.user])
//     const isProfile = useMemo(() => profile.user?.id === userProfileData?.id, [profile.user?.id, userProfileData?.id])

//     useEffect(() => {
//         if (!loadedRef.current) {
//             const StartApp = async () => {
//                 await dispatch(FetchUserProfileDataApi({ id: params.profile }) as any)
//             }
//             StartApp()
//             loadedRef.current = true;
//         }
//     }, []);


//     const handleFollow = async () => {
//         if (userProfileData?.id && profile.user?.id) {
//             await dispatch(UserFollowingApi({
//                 followingUserId: userProfileData?.id,
//                 followerUserId: profile.user?.id,
//                 isProfile: isProfile as boolean,
//                 type: null
//             }) as any)
//         }
//     }

//     const handleUnfollow = async () => {
//         if (userProfileData?.id && profile.user?.id) {
//             await dispatch(UserUnFollowingApi({
//                 followingUserId: userProfileData?.id,
//                 followerUserId: profile.user?.id,
//                 isProfile: isProfile as boolean,
//                 type: null
//             }) as any)
//         }
//     }

//     if (users.profileData.error) {
//         return <div>page not exits</div>
//     }
//     if (users.profileData.loading) {
//         return <SkeletonProfile />
//     }

//     if (userProfileData && profile.user) {

//         return (
//             <div className='w-full min-h-[100dvh]'>
//                 <div className='mx-auto max-w-[960px] overflow-x-hidden'>
//                     {/* md ->>> */}
//                     <div className="hidden sm:block">
//                         {/* profile header */}
//                         <div className='flex items-center my-8 m-5'>
//                             {isProfile ?
//                                 <OptionAvatarDialog profile={profile.user}>
//                                     <img src={userProfileData.profilePicture || "/user.jpg"}
//                                         className='sm:w-36 object-cover 
//               bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8 cursor-pointer' />
//                                 </OptionAvatarDialog> :
//                                 <img src={userProfileData.profilePicture || "/user.jpg"}
//                                     className='sm:w-36 object-cover 
//               bg-slate-400 sm:h-36 w-28 h-28 rounded-full sm:mr-8 cursor-pointer' />}
//                             <div className='flex flex-col justify-between gap-5'>
//                                 <ActionButtons
//                                     handleFollow={handleFollow}
//                                     handleUnfollow={handleUnfollow}
//                                     isFollowing={userProfileData.isFollowing}
//                                     user={userProfileData}
//                                     isProfile={isProfile} />
//                                 <div className='flex justify-between px-3'>
//                                     <div className='flex gap-1'>
//                                         <p className='text-base font-semibold'>
//                                             {userProfileData.postCount}
//                                         </p> posts
//                                     </div>
//                                     <div className='sm:cursor-pointer flex gap-1' onClick={() => router.push(`/${userProfileData.email}/followers`)}>
//                                         <p className='text-base font-semibold'>
//                                             {userProfileData.followersCount}
//                                         </p>
//                                         followers
//                                     </div>
//                                     <div className='sm:cursor-pointer flex gap-1' onClick={() => router.push(`/${userProfileData.email}/following`)}>
//                                         <p className='text-base font-semibold'>
//                                             {userProfileData.followingCount}
//                                         </p>
//                                         following
//                                     </div>
//                                 </div>

//                                 <div className='flex justify-between flex-col px-3 my-4'>
//                                     <p className='font-semibold'>{userProfileData.username}</p>
//                                     <p>!null</p>
//                                     <a className='flex items-center gap-2 hover:underline font-semibold text-sm'
//                                         target='_blank'
//                                         href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
//                                         <Link2 className='rotate-45' />
//                                         https://www.linkedin.com/in/akash-mondal-b5a712231/
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* story */}
//                         <div className='flex gap-10 m-5 my-10'>
//                             <img src={userProfileData.profilePicture || '/user.jpg'} className='w-20 h-20 rounded-full object-cover cursor-pointer' />
//                             <div className='w-20 h-20 border-[2px] rounded-full flex justify-center items-center cursor-pointer'>
//                                 <Plus className='w-16 h-16' />
//                             </div>
//                         </div>
//                         {/* post */}
//                         {userProfileData.isFollowing || profile.user.id === userProfileData.id ?
//                             <div className="grid grid-cols-3 gap-2">
//                                 {userProfileData.posts.map((post, index) => (
//                                     <img key={index} src={post.fileUrl[0]} className='aspect-square w-full h-full object-cover cursor-default' onClick={() => {
//                                         router.push(`/${userProfileData.email}/post/${post.id}`)
//                                     }} />
//                                 ))}
//                             </div> : <>
//                                 <div className='flex justify-center items-center h-72'>
//                                     <p className='text-xl font-semibold'>
//                                         Account is private
//                                     </p>
//                                 </div>
//                             </>
//                         }
//                         <div className='h-10 w-full'></div>
//                     </div>

//                     {/* <<<- sm */}
//                     <div className='sm:hidden'>
//                         {/* profile header */}
//                         <div className='flex gap-3 my-5 items-center px-2'>
//                             <img src={userProfileData.profilePicture || "/user.jpg"}
//                                 className='w-24 h-24 rounded-full object-cover bg-slate-400' />
//                             <div className='flex flex-col gap-4'>
//                                 <div className='flex gap-2'>
//                                     <p className='text-xl px-3'>{userProfileData.email}</p>
//                                 </div>
//                                 <ActionButtonsSM handleFollow={handleFollow}
//                                     handleUnfollow={handleUnfollow}
//                                     isFollowing={userProfileData.isFollowing}
//                                     user={userProfileData}
//                                     isProfile={isProfile} />
//                             </div>
//                         </div>
//                         {/*  */}
//                         <>
//                             <div className='flex justify-between flex-col px-3'>
//                                 <p>{userProfileData.username}</p>
//                                 <p>!null</p>
//                                 <a className='flex items-center gap-2
//              hover:underline font-semibold text-sm'
//                                     target='_blank'
//                                     href='https://www.linkedin.com/in/akash-mondal-b5a712231/'>
//                                     <Link2 className='rotate-45' />
//                                     https://www.linkedin.com/in/akash-mondal-b5a712231/
//                                 </a>
//                             </div>

//                             {/* stories */}
//                             <div className='flex gap-5 my-5 px-2'>
//                                 <img src={userProfileData.profilePicture || '/user.jpg'} className='w-16 h-16 rounded-full cursor-pointer' />
//                                 <div className='w-16 h-16 border-[2px] rounded-full flex justify-center items-center cursor-pointer'>
//                                     <Plus className='w-10 h-10' />
//                                 </div>
//                             </div>

//                             {/* followers and following */}
//                             <div className='flex justify-around p-2 border-y'>
//                                 <div className=' text-center'>
//                                     <p className='text-base font-semibold'>
//                                         {userProfileData.postCount}
//                                     </p>
//                                     <div>
//                                         posts
//                                     </div>
//                                 </div>

//                                 <div className='cursor-pointer text-center' onClick={() => {
//                                     router.push(`/${userProfileData.id}/follower`)
//                                 }}>
//                                     <p className='text-base font-semibold'>
//                                         {userProfileData.followersCount}
//                                     </p>
//                                     <div>
//                                         followers
//                                     </div>
//                                 </div>

//                                 <div className='cursor-pointer text-center' onClick={() => {
//                                     router.push(`/${userProfileData.id}/following`)
//                                 }}>
//                                     <p className='text-base font-semibold'>
//                                         {userProfileData.followingCount}
//                                     </p>
//                                     <div>
//                                         following
//                                     </div>
//                                 </div>

//                             </div>

//                         </>
//                         {/* posts */}
//                         <div className="grid grid-cols-3 gap-1 w-full">
//                             {userProfileData.posts.map((post, index) => (
//                                 <img key={index} src={post.fileUrl[0]} className='aspect-square w-full h-full object-cover' />
//                             ))}
//                         </div>
//                         <div className='h-10 w-full'></div>
//                     </div>

//                 </div>
//             </div >
//         )
//     }
// }
// export default Page


// const ActionButtons = ({
//     isProfile,
//     user,
//     isFollowing,
//     handleFollow,
//     handleUnfollow
// }: {
//     isProfile?: boolean
//     user: User
//     isFollowing?: boolean
//     handleFollow?: () => void
//     handleUnfollow?: () => void
// }) => {
//     const router = useRouter()

//     if (isProfile) {
//         return <div className='flex justify-between gap-2 items-center'>
//             <p className='text-xl px-3'>{user.username}</p>
//             <Button variant={"secondary"} className='rounded-xl' onClick={() => {
//                 router.push('/account/edit')
//             }}>
//                 Edit Profile
//             </Button>
//             <Button variant={"secondary"} className='rounded-xl' onClick={() => {
//                 router.push('/account/archive')
//             }}>
//                 View Archive
//             </Button>
//             <Settings className='w-8 h-8 cursor-pointer' />
//         </div>
//     }
//     return <div className='flex justify-between gap-2 items-center'>
//         <p className='text-xl px-3'>{user.username}</p>
//         {isFollowing ? <Button className='rounded-xl' onClick={handleUnfollow}>
//             Unfollow
//         </Button> : <Button className='rounded-xl' onClick={handleFollow}>
//             Follow
//         </Button>}

//         <Button variant={"secondary"} className='rounded-xl' onClick={() => {
//             router.push('/account/archive')
//         }}>
//             Message
//         </Button>
//         <Settings className='w-8 h-8 cursor-pointer' />
//     </div>
// }

// const ActionButtonsSM = ({
//     isProfile,
//     isFollowing,
//     handleFollow,
//     handleUnfollow
// }: {
//     isProfile?: boolean
//     user: User
//     isFollowing?: boolean
//     handleFollow?: () => void
//     handleUnfollow?: () => void
// }) => {
//     const router = useRouter()

//     if (isProfile) {
//         return <div className='flex justify-between gap-2 px-3'>
//             <Button variant={"secondary"} className='rounded-xl' onClick={() => {
//                 router.push('/account/edit')
//             }}>
//                 Edit Profile
//             </Button>
//             <Button variant={"secondary"} className='rounded-xl' onClick={() => {
//                 router.push('/account/archive')
//             }}>
//                 View Archive
//             </Button>
//         </div>
//     }

//     return <div className='flex justify-between gap-2 px-3'>
//         {isFollowing ? <Button className='rounded-xl' onClick={handleUnfollow}>
//             Unfollow
//         </Button> : <Button className='rounded-xl' onClick={handleFollow}>
//             Follow
//         </Button>}

//         <Button variant={"secondary"} className='rounded-xl' onClick={() => {
//             router.push('/account/archive')
//         }}>
//             Message
//         </Button>
//     </div>
// }