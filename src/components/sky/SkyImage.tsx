"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { ImageError } from './image.error';

interface OptimizedImageProps {
    src: string;
    alt?: string;
    width: number;
    height: number;
    className?: string;
    fetchPriority?: 'auto' | 'high' | 'low';
    sizes?: string;
    showErrorIcon?: boolean;
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
    showErrorIcon = false
}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const error = useRef(false)

    useEffect(() => {
        const img = imgRef.current;

        if (!img) return;

        const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const imgElement = entry.target as HTMLImageElement;
                    imgElement.src = imgElement.dataset.src!;
                    imgElement.onload = () => imgElement.removeAttribute('data-src');
                    observer.unobserve(imgElement);
                }
            });
        };

        const observer = new IntersectionObserver(onIntersection);

        observer.observe(img);

        // Cleanup on component unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    if (error.current && showErrorIcon) {
        return <ImageError />
    }

    return (
        <>
            <picture className='h-auto w-full cursor-pointer'>
                <source srcSet={src} type="image/avif" />
                <source srcSet={src} type="image/webp" />
                <source srcSet={src} type="image/jpeg" />
                <source srcSet={src} type="image/png" />
                <source srcSet={src} type="image/jpg" />
                <img
                    ref={imgRef}
                    data-src={src}
                    src={src}
                    alt={alt}
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
                        if (error.current) return;
                        error.current = true
                        onError && onError()
                    }}
                    onLoad={onLoad}
                />
            </picture>
        </>
    );
};

export default OptimizedImage;
