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
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    {!itself && <>
                        {user.isFollowing ?
                            <Button variant={"secondary"} className=" rounded-xl" onClick={() => handleActionUnFollow(user)}>
                                Unfollow
                            </Button> :
                            <Button variant={"default"}
                                className="rounded-xl" onClick={() => handleActionFollow(user)}>
                                Follow
                            </Button>}
                    </>}
                </div>
            </div>
        </>
    )
}

export default UserCard