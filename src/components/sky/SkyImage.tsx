/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';

interface OptimizedImageProps {
    src?: string;
    alt?: string;
    width: number;
    height: number;
    className?: string;
    fetchPriority?: 'auto' | 'high' | 'low';
    sizes?: string;
    showErrorIcon?: boolean;
    showErrorIconSm?: boolean;
    hideErrorLabel?: boolean;
    onError?: () => void;
    onLoad?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt = "image not found",
    width,
    height,
    className,
    fetchPriority = 'auto',
    sizes = '(min-width: 808px) 50vw, 100vw',
    onError,
    onLoad,
    hideErrorLabel = false,
    showErrorIconSm = false,
    showErrorIcon = false
}) => {
    const [error, setError] = useState(false)

    // useEffect(() => {
    //     const img = imgRef.current;

    //     if (!img) return;

    //     const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 const imgElement = entry.target as HTMLImageElement;
    //                 imgElement.src = imgElement.dataset.src!;
    //                 imgElement.onload = () => imgElement.removeAttribute('data-src');
    //                 observer.unobserve(imgElement);
    //             }
    //         });
    //     };

    //     const observer = new IntersectionObserver(onIntersection);

    //     observer.observe(img);

    //     // Cleanup on component unmount
    //     return () => {
    //         observer.disconnect();
    //     };
    // }, []);

    if (error && showErrorIcon) {
        return <ImageError  hideErrorLabel={hideErrorLabel} className={className}/>
    }

    if (error && showErrorIconSm) {
        return <ImageErrorSm className={className} hideErrorLabel={hideErrorLabel}/>
    }

    if (!src) return <ImageError hideErrorLabel={hideErrorLabel} className={className}/>

    return (
        <>
            <picture className='h-auto w-full cursor-pointer userNotSelectImg'>
                <source srcSet={src} type="image/avif" />
                <source srcSet={src} type="image/webp" />
                <source srcSet={src} type="image/jpeg" />
                <source srcSet={src} type="image/png" />
                <source srcSet={src} type="image/jpg" />
                <img
                    draggable={false}
                    onContextMenu={event => event.preventDefault()}
                    data-src={src}
                    src={src}
                    alt={''}
                    width={width}
                    height={height}
                    loading="lazy"
                    srcSet={`
                        ${src} 500w,
                        ${src} 800w,
                        ${src} 1080w,
                        ${src} 1200w,`}
                    decoding="async"
                    fetchPriority={fetchPriority}
                    sizes={sizes}
                    className={cn('h-auto w-full userNotSelectImg', className)}
                    onError={() => {
                        if (error) return;
                        setError(true)
                        onError && onError()
                    }}
                    onLoad={onLoad}
                />
            </picture>
        </>
    );
}

export default OptimizedImage;

export const ImageError = ({
    hideErrorLabel,
    className
}: {
    hideErrorLabel?: boolean
    className?: string
}) => {
    return (<div className={cn(`h-full w-full object-cover aspect-square p-4
    flex flex-col items-center justify-center md:space-y-2 userNotSelectImg bg-muted`,className)}>
        <RotateCcw className='md:w-10 md:h-10 w-8 h-8 cursor-pointer' strokeWidth={1.5} />
        <p className="text-center cursor-pointer text-xs md:text-base">
            {hideErrorLabel ? "":`Could't load image. Tap to retry`}
        </p>
    </div>)
}

export const ImageErrorSm = ({ className }: { className?: string,hideErrorLabel?: boolean }) => {
    return (<div className={cn(`w-full bg-muted rounded-full flex justify-center items-center p-1`, className)}>
        <img src='/user.jpg' alt='' className='w-full h-full rounded-full' />
    </div>)
}