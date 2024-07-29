import OptimizedImage from "@/components/sky/SkyImage"
import { Button } from "@/components/ui/button"
import {
    DialogClose
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { AuthorData } from "@/types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { TempleAlertDialog } from "@/components/Dialog/Temple.Dialog"

export default function OptionAvatarDialog({
    children,
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    const [isFile, setIsFile] = useState<File | null>()

    const handleUpload = async () => {
        // if (profile) {
        // await dispatch(profileUpdateApi({
        //     isFile,
        //     profile: profile
        // }) as any)
        setIsFile(null)
        alert('Profile Picture Updated')
        // }
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
                <div className="text-center cursor-pointer w-full text-blue-400 hover:text-blue-600 font-bold p-2 text-lg" onClick={onClick}>
                    Upload Photo
                </div>
                <Separator className="my-1" />
                <div className="text-center cursor-pointer w-full text-red-400 hover:text-red-600  font-bold p-2 text-lg">
                    Remove Current Photo
                </div>
                <Separator className="my-1" />
                <DialogClose asChild>
                    <div className="text-center cursor-pointer w-full  font-bold p-2 text-lg">
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