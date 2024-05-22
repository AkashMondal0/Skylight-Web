"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    fetchPriority?: 'auto' | 'high' | 'low';
    sizes?: string;
    onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
    src, alt, width, height, className,
    fetchPriority = 'auto', sizes = '(min-width: 808px) 50vw, 100vw',
    onError, onLoad
}) => {
    const imgRef = useRef<HTMLImageElement>(null);

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
                        ${src} 1200w,
                        ${src} 1400w,
                        ${src} 1600w,
                        ${src} 1800w,
                        ${src} 2000w,
                    `}
                    fetchPriority={fetchPriority}
                    sizes={sizes}
                    className={cn('h-auto w-full', className)}
                    onError={onError}
                    onLoad={onLoad}
                />
            </picture>
        </>
    );
};

export default OptimizedImage;
