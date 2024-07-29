'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
} from "@/components/ui/dialog"
import { ChevronLeft, ImageUp, Trash2 } from "lucide-react"
import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import OptimizedImage from "@/components/sky/SkyImage"
import { UploadImagesFireBaseApi } from "@/redux/services/account"
import { TempleDialog } from "./Temple.Dialog"
export default function UploadPostDialog({
    children
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    const [isFile, setIsFile] = useState<File[]>([])
    const session = useSession().data?.user
    const [step, setStep] = useState(0)

    const ToastAlert = (text: string) => {
        toast(text, {
            duration: 5000,
            position: "top-center"
        })
    }


    const onChangeFilePicker = (event: any) => {
        var fileArray = []
        const files = event.target.files.length
        for (let i = 0; i < files; i++) {
            const img = event.target.files[i]
            img['id'] = Math.random().toString(36).substr(2, 9)
            fileArray.push(event.target.files[i])
        }
        const stateImages = [...isFile, ...fileArray]
        setIsFile(stateImages)
    }

    const handleDeleteImage = (index: number) => {
        const filteredImages = isFile.filter((_, i) => i !== index)
        setIsFile(filteredImages)
    }

    const handleUpload = async (caption: string) => {
        if (!session?.id) {
            return ToastAlert('Please login to upload post')
        }
        if (isFile.length < 0) {
            return ToastAlert('Please select an image to upload')
        }
        if (isFile.length > 5) {
            return ToastAlert("You can't upload more than 5 images")
        }
        dispatch(UploadImagesFireBaseApi({
            isFile,
            isCaption: caption ?? "",
            profileId: session?.id
        }) as any)
        setIsFile([])
        document.getElementById('closeDialog')?.click()
    }

    const selectFile = useCallback(() => {
        const fileInput = document.getElementById('file')
        fileInput?.click()
    }, [])

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setIsFile([])
        }
    }

    return (

        <Dialog onOpenChange={onOpenChange}>
            <TempleDialog
                onChange={onOpenChange}
                header={<>
                    <div className="flex justify-between items-center border-b py-4 px-4 flex-none">
                        <div> {step > 0 ? <ChevronLeft onClick={() => setStep(0)} className="cursor-pointer" /> : <div />}</div>
                        <h1 className="text-xl font-semibold">Upload Post</h1>
                        <div />
                    </div>
                </>}
                TriggerChildren={children}>
                <div className="flex flex-col h-full">
                    <div className="h-full flex-1">
                        {isFile.length > 0 ?
                            <ShowSelectedImages
                                setStep={setStep}
                                step={step}
                                handleUpload={handleUpload}
                                selectFile={selectFile}
                                handleDeleteImage={handleDeleteImage}
                                images={isFile} />
                            : <div className="flex flex-col items-center justify-center h-full">
                                <ImageUp className="w-32 h-32 mx-auto cursor-pointer" onClick={selectFile} />
                                <div className="flex justify-center my-4 px-5">
                                    <Button onClick={selectFile} variant={"default"} className="rounded-xl p-2 w-52">
                                        Upload
                                    </Button>
                                </div>
                            </div>}
                    </div>
                </div>
                <input
                    // video and photo upload
                    type="file" accept="image/*"
                    id="file" multiple onChange={onChangeFilePicker}
                    className="hidden" />
            </TempleDialog>
        </Dialog>
    )
}


const ShowSelectedImages = ({
    images,
    handleDeleteImage,
    handleUpload,
    step,
    setStep,
    selectFile
}: {
    images: File[]
    handleDeleteImage: (index: number) => void
    NextStep?: () => void
    handleUpload: (caption: string) => void
    step: number
    selectFile: () => void
    setStep: (step: number) => void
}) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api, images])

    // scroll list of images
    if (step === 1) {
        return <AllFileList
            handleDeleteImage={handleDeleteImage}
            images={images}
            handleUpload={handleUpload} />
    }

    return (
        <div className="mx-auto">
            <Carousel setApi={setApi} className="w-full max-h-80">
                <CarouselContent>
                    {images.map((_, index) => (
                        <CarouselItem key={index} className="m-auto">
                            <OptimizedImage
                                width={320}
                                height={320}
                                sizes="(min-width: 808px) 30vw, 50vw"
                                src={URL.createObjectURL(images[index])}
                                alt={`Image ${index + 1}`}
                                className="w-auto h-auto max-h-80 object-cover rounded-xl mx-auto"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant={"default"} className='left-2' />
                <CarouselNext variant={"default"} className=' right-2' />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {images.length}
            </div>
            <Button variant={"secondary"} onClick={selectFile}
                className="rounded-xl p-2 mb-4 w-full">
                Add
            </Button>
            <Button variant={"default"} onClick={() => { setStep(1) }} className="rounded-xl p-2 mb-4 w-full">
                Next
            </Button>
        </div>
    )
}

const AllFileList = memo(function ({
    images,
    handleDeleteImage,
    handleUpload
}: {
    images: File[],
    handleDeleteImage: (id: number) => void
    handleUpload: (caption: string) => void
}) {
    const captionRef = useRef<HTMLTextAreaElement | any>()

    return (<>
        <div className="flex flex-col space-y-4 justify-between h-full">
            <div>
                {images.map((image: File, i) => (
                    <div key={i} className="flex my-2 justify-between items-center border p-2 rounded-xl">
                        <div className="flex items-center space-x-2">
                            <OptimizedImage
                                width={320}
                                height={320}
                                sizes="(min-width: 808px) 10vw, 15vw"
                                src={URL.createObjectURL(image)}
                                alt={image.name}
                                className="w-16 h-16 object-cover rounded-xl"
                            />
                            <p>{image.name.slice(0, 11)}...</p>
                        </div>
                        <Button onClick={() => handleDeleteImage(i)} variant={"outline"} className="rounded-xl p-2">
                            <Trash2 className="text-red-500" />
                        </Button>
                    </div>))}
            </div>
            <div className="w-full">
                <textarea
                    className="border rounded-xl p-2 w-full"
                    placeholder="Write a caption..."
                    ref={captionRef} />
                <DialogClose id="closeDialog"></DialogClose>
                <Button variant={"secondary"}
                    onClick={() => {
                        handleUpload(captionRef.current.value)
                    }}
                    className="rounded-xl p-2 w-full">
                    Upload
                </Button>
                <div className="h-5" />
            </div>
        </div>
    </>)
}, ((preProps: any, nextProps: any) => {
    return preProps.images.length === nextProps.images.length
}))