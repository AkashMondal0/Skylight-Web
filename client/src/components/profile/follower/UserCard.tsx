import SkyAvatar from "@/components/sky/SkyAvatar"
import { Button } from "@/components/ui/button"
import { User } from "@/types"

const UserCard = ({
    user,
    pageRedirect,
    handleActionUnFollow,
    isProfile,
    itself,
    handleActionFollow
}: {
    user: User
    pageRedirect: (user: User) => void
    handleActionUnFollow: (user: User) => void
    isProfile?: boolean
    itself?: boolean
    handleActionFollow: (user: User) => void
}) => {
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
                    {!itself && <>
                        {!user.isFollowing &&
                            <Button variant={"default"}
                                className="rounded-xl" onClick={() => handleActionFollow(user)}>
                                Follow
                            </Button>}
                    </>}
                    {isProfile && <Button variant={"secondary"}
                        disabled={user.removeFollower}
                        className="rounded-xl" onClick={() => handleActionUnFollow(user)}>
                        Remove
                    </Button>}
                </div>
            </div>
        </>
    )
}

export default UserCard