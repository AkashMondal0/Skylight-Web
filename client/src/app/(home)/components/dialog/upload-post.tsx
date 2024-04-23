/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { ImageUp } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDispatch, useSelector } from "react-redux"
import { postFilesApi } from "@/redux/slice/post-feed/api-functions"
import { RootState } from "@/redux/store"


export default function UploadPostDialog({
    children
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    const [isFile, setIsFile] = useState<File[]>([])
    const isCaption = useRef<HTMLTextAreaElement>()
    const useProfile = useSelector((state: RootState) => state.profile)

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

    const handleUpload = async () => {
        if (useProfile.profileData) {
            await dispatch(postFilesApi({
                isFile,
                isCaption: isCaption?.current?.value ? isCaption?.current?.value : "",
                profile: useProfile.profileData
            }) as any)
            setIsFile([])
        }
    }

    const selectFile = useCallback(() => {
        const fileInput = document.getElementById('file')
        fileInput?.click()
    }, [])


    useEffect(() => {
        console.log(useProfile.profileData)
    }, [useProfile.profileData])

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-4/5 p-2 rounded-xl">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-center border-b pb-4">
                        <h1 className="text-xl font-semibold">Upload Post</h1>
                    </div>
                    {
                        isFile.length > 0 ?
                            <ShowSelectedImages
                                isCaption={isCaption}
                                uploadFiles={handleUpload}
                                handleDeleteImage={handleDeleteImage}
                                images={isFile} />
                            : <div>
                                <ImageUp className="w-32 h-32 mx-auto" />
                                <div className="flex justify-between my-4">
                                    <Button onClick={selectFile} variant={"default"} className="rounded-md p-2 w-full">
                                        Upload
                                    </Button>
                                </div>
                            </div>
                    }
                    <input type="file" id="file" multiple onChange={onChangeFilePicker} className="hidden" />
                </div>
            </DialogContent>
        </Dialog>
    )
}


const ShowSelectedImages = ({
    images,
    handleDeleteImage,
    uploadFiles,
    isCaption,
}: {
    images: File[]
    handleDeleteImage: (index: number) => void
    NextStep?: () => void
    uploadFiles?: () => void
    isCaption: any
}) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [step, setStep] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api, images])

    if (step === 1) {
        return <>
            <div className="flex flex-col space-y-4">
                <ScrollArea className="h-96">
                    {
                        images.map((image: any, i) => (
                            <div key={image.id} className="flex my-2 justify-between items-center border p-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <p>{image.name}</p>
                                </div>
                                <Button onClick={() => handleDeleteImage(i)} variant={"default"} className="rounded-md p-2">
                                    Delete
                                </Button>
                            </div>
                        ))
                    }
                </ScrollArea>
                <textarea
                    className="border rounded-md p-2"
                    placeholder="Write a caption..."
                    ref={isCaption}
                />
                <DialogClose asChild>
                    <Button variant={"default"}
                        onClick={uploadFiles}
                        className="rounded-md p-2 w-full">
                        Upload
                    </Button>
                </DialogClose>

            </div>
        </>
    }

    return (
        <div className="mx-auto">
            <Carousel setApi={setApi} className="w-80 h-80">
                <CarouselContent>
                    {images.map((_, index) => (
                        <CarouselItem key={index}>
                            <img
                                src={URL.createObjectURL(images[index])}
                                alt={`Image ${index + 1}`}
                                className="w-80 h-80 object-cover rounded-xl"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {images.length}
            </div>
            <Button variant={"default"} onClick={() => {
                setStep(1)
            }} className="rounded-md p-2 mb-4 w-full">
                Next
            </Button>
        </div>
    )
}