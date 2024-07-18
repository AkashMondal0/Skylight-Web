import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import OptimizedImage from "../sky/SkyImage";
import { FeedPost } from "@/types";
import { ImageViewLoading } from "./loading.components";
import { ImageError } from "../sky/image.error";

const ImageView = ({
    data,
    loading,
    error
}: {
    data: FeedPost | null
    loading: boolean
    error: unknown
}) => {

    if (loading) {
        return <ImageViewLoading />
    }

    if (error) {
        return <div className='sm:flex-1 flex-initial h-auto m-auto'>
            <ImageError />
        </div>
    }

    if (!data) {
        return <div className='sm:flex-1 flex-initial h-auto m-auto'>
            <ImageError />
        </div>
    }

    return (<div className='sm:flex-1 flex-initial h-auto m-auto p-1'>
        <Carousel>
            <CarouselContent>
                {data?.fileUrl?.map((url, index) => (
                    <CarouselItem key={index} className='m-auto'>
                        <OptimizedImage
                            src={url}
                            width={500}
                            height={500}
                            alt="Could't load image. Tap to retry"
                            sizes="(min-width: 808px) 50vw, 100vw"
                            fetchPriority="high"
                            className='w-auto h-auto cursor-default border m-auto rounded-lg userNotSelectImg'
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className='flex'>
                <CarouselPrevious variant={"default"} className='left-2' />
                <CarouselNext variant={"default"} className=' right-2' />
            </div>
        </Carousel>
    </div>)
}
export default ImageView;