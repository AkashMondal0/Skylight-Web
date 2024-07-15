import SkyAvatar from "@/components/sky/SkyAvatar"
import { Button } from "@/components/ui/button"
import { AuthorData } from "@/types"
import { UnFollowDialog } from "../dialog/unfollow"
import { useRouter } from "next/navigation"


const UserCardFollowing = ({
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
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    {isProfile ? <>
                        {/* if profile */}
                        {itself ? <p className="text-sm">You</p> : <>
                            {user.following ?
                                <UnFollowDialog
                                    user={user}
                                    HandleRejected={HandleRejected}
                                    HandleConfirm={HandleConfirm}>
                                    <Button variant={"secondary"}
                                        className="rounded-xl">
                                        Following  {/* UnFollow */}
                                    </Button>
                                </UnFollowDialog>
                                :
                                <Button variant={"secondary"} className="rounded-xl">
                                    Follow
                                </Button>}
                        </>}
                    </> : <>
                        {
                            itself ? <p className="text-sm">You</p> : <>
                                {user.following ?
                                    <UnFollowDialog
                                        user={user}
                                        HandleRejected={HandleConfirm}
                                        HandleConfirm={HandleConfirm}>
                                        <Button variant={"secondary"}
                                            className="rounded-xl">
                                            Following  {/* UnFollow */}
                                        </Button>
                                    </UnFollowDialog> :
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

export default UserCardFollowing