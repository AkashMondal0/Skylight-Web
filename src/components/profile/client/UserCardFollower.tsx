import SkyAvatar from "@/components/sky/SkyAvatar"
import { Button } from "@/components/ui/button"
import { AuthorData, User } from "@/types"

const UserCardFollower = ({
    user,
    pageRedirect,
    handleActionUnFollow,
    isProfile,
    itself,
    handleActionFollow
}: {
    user: AuthorData
    pageRedirect: (user: AuthorData) => void
    handleActionUnFollow: (user: AuthorData) => void
    isProfile?: boolean
    itself?: boolean
    handleActionFollow: (user: AuthorData) => void
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
                                <Button variant={"secondary"} className="rounded-xl">
                                    Remove
                                </Button>}
                        </>}
                    </> : <>
                        {
                            itself ? <p className="text-sm">You</p> : <>
                                {user.following ?
                                    <Button variant={"secondary"} className="rounded-xl" onClick={() => handleActionUnFollow(user)}>
                                        Following
                                        {/* this is unfollow func */}
                                    </Button> :
                                    <Button variant={"default"} className="rounded-xl" onClick={() => handleActionFollow(user)}>
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