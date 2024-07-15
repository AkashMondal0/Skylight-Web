import SkyAvatar from "@/components/sky/SkyAvatar"
import { Button } from "@/components/ui/button"
import { AuthorData, User } from "@/types"
import { FollowerRemoveDialog } from "../dialog/remove.follower"
import { useRouter } from "next/navigation"

const UserCardFollower = ({
    user,
    isProfile,
    itself
}: {
    user: AuthorData
    isProfile?: boolean
    itself?: boolean
}) => {
    const router = useRouter()
    const pageRedirect = (user: AuthorData) => {
        router.push(`/${user?.username}`)
    }
    const handleUnFollow = async (user: AuthorData) => {
        // if (profile?.id) {
        //   await dispatch(UserUnFollowingApi({
        //     followingUserId: profile.id,
        //     followerUserId: user.id,
        //     isProfile: isProfile as boolean,
        //     type: "followers",
        //     userId: user.id
        //   }) as any)
        //   /// remove from list
        // }
    }

    const handleFollow = (user: AuthorData) => {
        // if (profile?.id) {
        //   dispatch(UserFollowingApi({
        //     followingUserId: user.id,
        //     followingUsername:user.username,
        //     followerUserId: profile.id,
        //     followerUsername: profile.username,
        //     isProfile: isProfile as boolean,
        //     type: "followers",
        //     userId: user.id
        // }) as any)
        // }
    }
    const handleRemoveFollow = (user: AuthorData) => {
        // if (profile?.id) {
        //   dispatch(UserFollowingApi({
        //     followingUserId: user.id,
        //     followingUsername:user.username,
        //     followerUserId: profile.id,
        //     followerUsername: profile.username,
        //     isProfile: isProfile as boolean,
        //     type: "followers",
        //     userId: user.id
        // }) as any)
        // }
    }
    const HandleRejected = () => { }
    const HandleConfirm = () => { }

    if (!user) return null

    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center cursor-pointer' onClick={() => pageRedirect(user)}>
                    <SkyAvatar url={user.profilePicture || "/user.jpg"} className='h-10 w-10 mx-auto' />
                    <div>
                        <div className='font-semibold text-base'>
                            {user.username}
                        </div>
                        <div className='text-sm'>
                            {user.name}
                        </div>
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    {isProfile ? <>
                        {itself ? <p className="text-sm">You</p> : <>
                            {/* if your not following this user */}
                            {!user.following &&
                                <Button variant={"link"}
                                    className="rounded-xl
                                    hover:text-white
                                    hover:no-underline
                                    text-blue-500">
                                    Follow
                                </Button>}
                            {/* if user following you */}
                            {user.followed_by &&
                                <FollowerRemoveDialog
                                    user={user}
                                    HandleRejected={HandleRejected}
                                    HandleConfirm={HandleConfirm}>
                                    <Button variant={"secondary"} className="rounded-xl">
                                        Remove
                                    </Button>
                                </FollowerRemoveDialog>}
                        </>}
                    </> : <>
                        {
                            itself ? <p className="text-sm">You</p> : <>
                                {user.following ?
                                    <FollowerRemoveDialog
                                        user={user}
                                        HandleRejected={HandleRejected}
                                        HandleConfirm={HandleConfirm}>
                                        <Button variant={"secondary"} className="rounded-xl">
                                            Following
                                            {/* this is unfollow func */}
                                        </Button>
                                    </FollowerRemoveDialog>
                                    :
                                    <Button variant={"default"}
                                        className="rounded-xl">
                                        Follow
                                    </Button>}
                            </>
                        }
                    </>}
                </div>
            </div>
        </>
    )
}

export default UserCardFollower