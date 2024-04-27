import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { followingsDataClear, UsersState } from "@/redux/slice/users"
import { UserFollowingApi, UserUnFollowingApi } from "@/redux/slice/users/api-functions"
import { User } from "@/types"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

export default function FollowingsDialog({
    children,
    users,
    profile,
    isProfile
}: {
    children: React.ReactNode
    users: UsersState
    profile: User
    isProfile?: boolean
}) {
    const dispatch = useDispatch()
    const router = useRouter()
    const pageRedirect = (user: User) => {
        router.push(`/${user?.email}`)
    }
    const handleActionUnFollow = (user: User) => {
        if (profile?.id) {
            dispatch(UserUnFollowingApi({
                followingUserId: user.id,
                followerUserId: profile.id
            }) as any)
        }
    }
    const handleActionFollow = () => {
        if (profile?.id) {
            dispatch(UserFollowingApi({
                followingUserId: profile.id,
                followerUserId: profile.id
            }) as any)
        }
    }
    return <Dialog onOpenChange={(isOpen) => {
        if (!isOpen) {
            dispatch(followingsDataClear())
        }
    }}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="max-w-[425px] pb-0">
            <h1 className="text-center font-semibold text-lg">Followings</h1>
            <Separator />
            <ScrollArea className="h-72 w-full rounded-md">
                {users.profileData.fetchFollow.followings.map((user, i) => <UserCard 
                key={i} user={user} 
                pageRedirect={pageRedirect}
                handleActionUnFollow={handleActionUnFollow} />)}
                {users.profileData.fetchFollow.loading ? <>{Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}</> : <></>}
            </ScrollArea>
        </DialogContent>
    </Dialog>
}

const UserCard = ({
    user,
    pageRedirect,
    handleActionUnFollow
}: {
    user: User
    pageRedirect: (user: User) => void
    handleActionUnFollow: (user: User) => void
}) => {
    if (!user) return null
    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center cursor-pointer'onClick={() => pageRedirect(user)}>
                    <Avatar className='h-10 w-10 mx-auto'>
                        <AvatarImage src={user.profilePicture || "/user.jpg"}
                            alt="@sky" className='rounded-full' />
                    </Avatar>
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
                    <Button variant={"secondary"} className=" rounded-xl" onClick={() => handleActionUnFollow(user)}>
                        Unfollow
                    </Button>
                </div>
            </div>
        </>
    )
}

const SkeletonUserCard = () => {

    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center'>
                    <Skeleton className='h-12 w-12 mx-auto rounded-full' />
                    <div className='space-y-1'>
                        <div className='font-semibold text-base'>
                            <Skeleton className='w-28 h-4' />
                        </div>
                        <div className='text-sm'>
                            <Skeleton className='w-16 h-3' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <Skeleton className='w-20 h-9 rounded-xl' />
                </div>
            </div>
        </>
    )
}