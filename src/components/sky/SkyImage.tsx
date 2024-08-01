/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';

interface OptimizedImageProps {
    src: string;
    alt?: string;
    width: number;
    height: number;
    className?: string;
    fetchPriority?: 'auto' | 'high' | 'low';
    sizes?: string;
    showErrorIcon?: boolean;
    showErrorIconSm?: boolean;
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
        return <ImageError />
    }

    if (error && showErrorIconSm) {
        return <ImageErrorSm className={className} />
    }

    if (!src) return <ImageError />

    return (
        <>
            <picture className='h-auto w-full cursor-pointer'>
                <source srcSet={src} type="image/avif" />
                <source srcSet={src} type="image/webp" />
                <source srcSet={src} type="image/jpeg" />
                <source srcSet={src} type="image/png" />
                <source srcSet={src} type="image/jpg" />
                <img
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
                    className={cn('h-auto w-full', className)}
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

export const ImageError = () => {
    return (<div className={`h-full w-full object-cover aspect-square
    flex flex-col items-center justify-center space-y-4 userNotSelectImg bg-muted`}>
        <RotateCcw className='w-10 h-10 cursor-pointer' strokeWidth={1.5} />
        <p className="text-center cursor-pointer">{`Could't load image. Tap to retry`}</p>
    </div>)
}

export const ImageErrorSm = ({ className }: { className?: string }) => {
    return (<div className={cn(`w-full bg-muted rounded-full flex justify-center items-center p-1`, className)}>
        <img src='/user.jpg' alt='' className='w-full h-full rounded-full' />
    </div>)
}