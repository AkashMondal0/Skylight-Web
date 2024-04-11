import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function FollowingsDialog({
    children,
}: {
    children: React.ReactNode
}) {
    return <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="max-w-[425px] pb-0">
            <h1 className="text-center font-semibold text-lg">Followings</h1>
            <Separator />
            <ScrollArea className="h-72 w-full rounded-md">
                {[...Array(50)].map((_, i) => <UserCard key={i} />)}
            </ScrollArea>
        </DialogContent>
    </Dialog>
}

const UserCard = ({
    url = "https://github.com/shadcn.png",
}: {
    url?: string
}) => {
    return (
        <>
            <div className='flex justify-between px-2 my-4'>
                <div className='flex space-x-2 items-center'>
                    <Avatar className='h-10 w-10 mx-auto'>
                        <AvatarImage src={url}
                            alt="@shadcn" className='rounded-full' />
                    </Avatar>
                    <div>
                        <div className='font-semibold text-base'>Akash Mondal</div>
                        <div className='text-sm'>
                            suggested for you
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <Button variant={"secondary"} className=" rounded-xl">
                        Remove
                    </Button>
                </div>
            </div>
        </>
    )
}