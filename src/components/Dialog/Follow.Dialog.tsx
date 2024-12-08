import React from "react"
import { Button } from "@/components/ui/button"
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AuthorData } from "@/types"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { DialogClose } from "@radix-ui/react-dialog"
import { TempleAlertDialog } from "./Temple.Dialog"

interface Props {
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
}: Props) {
    return (
        <TempleAlertDialog
            TriggerChildren={children}>
            <div className="space-y-4 my-8">
                <SkyAvatar
                    sizeImage='10vw'
                    url={user.profilePicture}
                    className={'w-28 h-28 mx-auto'} />
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center my-2">Remove follower?</DialogTitle>
                    <DialogDescription className="text-center">
                        {`Snaapio won't tell ${user.username} they were removed from your followers.`}
                    </DialogDescription>
                </DialogHeader>
                <div className="justify-center flex-col flex gap-3">
                    <DialogClose asChild>
                        <Button variant={"destructive"} onClick={HandleConfirm}>
                            Remove
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant={"secondary"} onClick={HandleRejected}>
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </div>
        </TempleAlertDialog>
    )
}

export function UnFollowDialog({
    children,
    HandleRejected,
    HandleConfirm,
    user
}: Props) {
    return (
        <TempleAlertDialog
            TriggerChildren={children}>
            <div className="space-y-4 my-8">
                <SkyAvatar
                    sizeImage='10vw'
                    url={user.profilePicture}
                    className={'w-28 h-28 mx-auto'} />
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center my-2">Unfollow @{user.username}</DialogTitle>
                    <DialogDescription className="text-center">
                        {`Snaapio won't tell ${user.username} they were removed from your followers.`}
                    </DialogDescription>
                </DialogHeader>
                <div className="justify-center flex-col flex gap-3">
                    <DialogClose asChild>
                        <Button variant={"destructive"} onClick={HandleConfirm}>
                            Unfollow
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant={"secondary"} onClick={HandleRejected}>
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </div>
        </TempleAlertDialog>
    )
}
