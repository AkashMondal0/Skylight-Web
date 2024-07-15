import SkyAvatar from "@/components/sky/SkyAvatar"
import { Button } from "@/components/ui/button"
import { AuthorData } from "@/types"


const UserCardFollowing = ({
    user,
    pageRedirect,
    handleActionUnFollow = () => { },
    isProfile,
    itself,
    handleActionFollow = () => { }
}: {
    user: AuthorData
    pageRedirect: (user: AuthorData) => void
    handleActionUnFollow?: (user: AuthorData) => void
    isProfile?: boolean
    itself?: boolean
    handleActionFollow?: (user: AuthorData) => void
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
                    {isProfile ? <>
                        {/* if profile */}
                        {itself ? <p className="text-sm">You</p> : <>
                            {user.following ?
                                <Button variant={"secondary"}
                                    className="rounded-xl">
                                    Following  {/* UnFollow */}
                                </Button>
                                :
                                <Button variant={"secondary"} className="rounded-xl">
                                    Follow
                                </Button>}
                        </>}
                    </> : <>
                        {
                            itself ? <p className="text-sm">You</p> : <>
                                {user.following ?
                                    <Button variant={"secondary"} className="rounded-xl" onClick={() => handleActionUnFollow(user)}>
                                        Following {/* Unfollow function*/}
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

export default UserCardFollowing