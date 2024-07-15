import React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AuthorData } from "@/types"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { DialogClose } from "@radix-ui/react-dialog"
interface FollowerRemoveDialogProps {
    children: React.ReactNode
    HandleConfirm: () => void
    HandleRejected: () => void
    user: AuthorData
}

export function FollowerRemoveDialog({
    children,
    HandleRejected,
    HandleConfirm,
    user
}: FollowerRemoveDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <SkyAvatar
                    sizeImage='10vw'
                    url={user.profilePicture ?? "/user.jpg"}
                    className={'object-cover bg-slate-400 w-28 h-28 rounded-full userNotSelectImg mx-auto my-4'} />
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center my-2">Remove follower?</DialogTitle>
                    <DialogDescription className="text-center">
                        {`  Skylight won't tell ${user.username} they were removed from your followers.`}
                    </DialogDescription>
                </DialogHeader>
                <div className="justify-center flex-col flex gap-3">
                    <Button variant={"destructive"}>
                        Remove
                    </Button>
                    <DialogClose asChild>
                        <Button variant={"secondary"}>
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
