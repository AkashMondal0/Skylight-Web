/* eslint-disable @next/next/no-img-element */
import OptimizedImage from "@/components/sky/SkyImage"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { User } from "@/types"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function OptionAvatarDialog({
    children,
    profile
}: {
    children: React.ReactNode
    profile: User
}) {
    const dispatch = useDispatch()
    const [isFile, setIsFile] = useState<File | null>()

    const handleUpload = async () => {
        if (profile) {
            // await dispatch(profileUpdateApi({
            //     isFile,
            //     profile: profile
            // }) as any)
            setIsFile(null)
            alert('Profile Picture Updated')
        }
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
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <h1 className="text-2xl text-center">Change Profile Photo</h1>
                <Separator className="my-1" />
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
                ) : <>
                    <div className="text-center cursor-pointer w-full text-blue-400 hover:text-blue-600 font-semibold" onClick={onClick}>
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
                </>}
            </DialogContent>
        </Dialog>
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
        <div className="mx-auto space-y-2">
            <OptimizedImage
                width={20}
                height={20}
                sizes="10vw"
                alt='picture'
                src={URL.createObjectURL(images)}
                className="w-80 h-80 object-cover rounded-xl mb-5" />
            <Button variant={"secondary"} onClick={AgainSelect} className="rounded-md p-2 w-full">
                Choose
            </Button>
            <DialogClose asChild>
                <Button variant={"default"} onClick={uploadFiles} className="rounded-md p-2 w-full">
                    Submit
                </Button>
            </DialogClose>
        </div>
    )
}