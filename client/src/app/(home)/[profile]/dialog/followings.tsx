import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { UsersState } from "@/redux/slice/users"
import { User } from "@/types"

export default function FollowingsDialog({
    children,
    users
}: {
    children: React.ReactNode
    users: UsersState
}) {

    return <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="max-w-[425px] pb-0">
            <h1 className="text-center font-semibold text-lg">Followings</h1>
            <Separator />
            <ScrollArea className="h-72 w-full rounded-md">
                {users.profileData.fetchFollow.followings.map((user, i) => <UserCard key={i} user={user} />)}
            </ScrollArea>
        </DialogContent>
    </Dialog>
}

const UserCard = ({
    user,
    action
}: {
    user: User
    action?: () => void
}) => {
    if (!user) return null
    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center'>
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
                    <Button variant={"secondary"} className=" rounded-xl" onClick={action}>
                        Unfollow
                    </Button>
                </div>
            </div>
        </>
    )
}