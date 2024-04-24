import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function OptionAvatarDialog({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <h1 className="text-2xl text-center">Change Profile Photo</h1>
                <Separator className="my-1" />
                <div className="text-center cursor-pointer w-full text-blue-400 hover:text-blue-600 font-semibold">
                    Upload Photo
                </div>
                <Separator className="my-1" />
                <div className="text-center cursor-pointer w-full text-red-400 hover:text-red-600 font-semibold">
                    Remove Current Photo
                </div>
                <Separator className="my-1" />
                <DialogClose asChild>
                    <div className="text-center cursor-pointer w-full font-semibold">
                        Cancel
                    </div>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
