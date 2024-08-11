import OptimizedImage from "@/components/sky/SkyImage"
import { Button } from "@/components/ui/button"
import {
    DialogClose
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { AuthorData, disPatchResponse } from "@/types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { TempleAlertDialog } from "@/components/Dialog/Temple.Dialog"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { profileUpdateApi } from "@/redux/services/account"

export default function OptionAvatarDialog({
    children,
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    const [isFile, setIsFile] = useState<File | null>()
    const session = useSession()

    const handleUpload = async () => {
        if (!session.data?.user?.id || !isFile) return toast("Something's went Wrong")

        const res = await dispatch(profileUpdateApi({
            file: isFile,
            profile: session.data.user
        }) as any) as disPatchResponse<AuthorData>

        if (res.error) return toast("Something's went Wrong")

        if (res.payload.profilePicture) {
            await session.update({
                ...session.data.user,
                image: res.payload.profilePicture,
                profilePicture:res.payload.profilePicture
            });
        }
        setIsFile(null)
        toast("Profile Picture Updated")
    }

    const onChangeFilePicker = (event: any) => {
        const files = event.target.files[0]
        setIsFile(files)
    }

    const onClick = () => {
        const fileInput = document.getElementById('file')
        fileInput?.click()
    }

    return (
        <TempleAlertDialog
            onOpenChange={() => {
                setIsFile(null)
            }}
            headerTitle="Change Profile Photo"
            TriggerChildren={children}>
            <input
                // only photo can be uploaded
                accept="image/*"
                type="file"
                id="file" onChange={onChangeFilePicker} className="hidden" />
            {isFile ? (
                <ShowSelectedImages
                    images={isFile}
                    AgainSelect={onClick}
                    uploadFiles={handleUpload}
                />
            ) : <div className="my-2">
                <div className="text-center cursor-pointer w-full text-blue-400 hover:text-blue-600 font-semibold p-2" onClick={onClick}>
                    Upload Photo
                </div>
                <Separator className="my-1" />
                <div className="text-center cursor-pointer w-full text-red-400 hover:text-red-600  font-semibold p-2">
                    Remove Current Photo
                </div>
                <Separator className="my-1" />
                <DialogClose asChild>
                    <div className="text-center cursor-pointer w-full  font-semibold p-2">
                        Cancel
                    </div>
                </DialogClose>
            </div>}
        </TempleAlertDialog>
    )
}


const ShowSelectedImages = ({
    images,
    AgainSelect,
    uploadFiles,
}: {
    images: File
    AgainSelect: () => void
    uploadFiles?: () => void
}) => {

    return (
        <div>
            <OptimizedImage
                width={20}
                height={20}
                sizes="10vw"
                alt='picture'
                src={URL.createObjectURL(images)}
                className="w-80 h-80 object-cover rounded-xl my-5 mx-auto" />
            <Button variant={"secondary"} onClick={AgainSelect} className="rounded-md p-2 w-full my-2">
                Choose
            </Button>
            <DialogClose asChild>
                <Button variant={"default"} onClick={uploadFiles} className="rounded-md p-2 w-full my-4">
                    Submit
                </Button>
            </DialogClose>
        </div>
    )
}