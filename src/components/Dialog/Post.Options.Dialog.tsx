
import {
    DialogClose
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TempleAlertDialog } from "@/components/Dialog/Temple.Dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Post } from "@/types"
import { RootState } from "@/redux-stores/store"

export default function PostOptionsDialog({
    children,
    data
}: {
    children: React.ReactNode
    data: Post
}) {
    const session = useSelector((state: RootState) => state.AccountState.session)
    const router = useRouter()
    const dispatch = useDispatch()


    const goToPost = () => {
        // navigate to post
        router.push(`/post/p/${data.id}`)
    }

    const deletePost = async () => {
        // delete post
    }

    const hideLikeCount = async () => {
    }

    const turnOffCommenting = async () => {
    }

    const editPost = async () => {
    }


    const PostOptionAuthor = () => {

        if (data.user.id === session?.id) {
            return (
                <div className="">
                    <div className="text-center cursor-pointer w-full text-red-400 hover:text-red-600 my-3" onClick={deletePost}>
                        Delete
                    </div>
                    <Separator />
                    <div className="text-center cursor-pointer w-full my-3" onClick={editPost}>
                        Edit
                    </div>
                    <Separator />
                    <div className="text-center cursor-pointer w-full my-3" onClick={hideLikeCount}>
                        Hide Like Count to others
                    </div>
                    <Separator />
                    <div className="text-center cursor-pointer w-full my-3" onClick={turnOffCommenting}>
                        turn off commenting
                    </div>
                    <Separator />
                    <div className="text-center cursor-pointer w-full my-3" onClick={goToPost}>
                        Go to post
                    </div>
                    <Separator />
                </div>
            )
        }
        return (
            <div className="">
                <div className="text-center cursor-pointer w-full text-red-400 hover:text-red-600 my-3" onClick={deletePost}>
                    Report
                </div>
                <Separator />
                <div className="text-center cursor-pointer w-full text-red-400 hover:text-red-600 my-3" onClick={deletePost}>
                    Unfollow
                </div>
                <Separator />
                <div className="text-center cursor-pointer w-full my-3" onClick={editPost}>
                {`Add to favorite's`}
                </div>
                <Separator />
                <div className="text-center cursor-pointer w-full my-3" onClick={hideLikeCount}>
                    Go to post
                </div>
                <Separator />
                <div className="text-center cursor-pointer w-full my-3" onClick={turnOffCommenting}>
                    Share to...
                </div>
                <Separator />
                <div className="text-center cursor-pointer w-full my-3" onClick={goToPost}>
                    Copy Link
                </div>
                <Separator />
                <div className="text-center cursor-pointer w-full my-3" onClick={goToPost}>
                    Embed
                </div>
                <Separator />
                <div className="text-center cursor-pointer w-full my-3" onClick={goToPost}>
                    About this account
                </div>
                <Separator />
            </div>
        )
    }




    return (
        <TempleAlertDialog
            onOpenChange={() => { }}
            TriggerChildren={children}>
            <PostOptionAuthor />
            <DialogClose asChild>
                <div className="text-center cursor-pointer w-full my-3">
                    Cancel
                </div>
            </DialogClose>
        </TempleAlertDialog>
    )
}
