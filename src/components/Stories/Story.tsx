"use client"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StoryItem, UploadYourStory } from '@/components/Stories/StoryItem';
import { useVirtualizer } from '@tanstack/react-virtual';
import { generateRandomUsername } from '../sky/random';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const story = Array.from({ length: 20 }, (_, i) => {
    return {
        url: `https://picsum.photos/id/${100 + i}/${50}/${50}`,
        label: `${generateRandomUsername()}`
    }
})
interface StoriesProp {
    // story: {
    //     url: string
    //     label: string
    // }[]
}
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;
export const Stories = memo(function Story({
    // story
}: StoriesProp) {

    // const posts = useSelector((Root: RootState) => Root.posts)
    const parentRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => story, [])
    const count = useMemo(() => data.length, [data.length])

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 80, []),
        overscan: 5,
    })
    // const items = columnVirtualizer.getVirtualItems()

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleScrollPrevious = useCallback(() => {
        const parent = parentRef.current
        if (parent) {
            parent.scrollTo({
                left: parent.scrollLeft - 390,
                behavior: 'smooth',
            })
        }
    }, [])

    const handleScrollNext = useCallback(() => {
        const parent = parentRef.current
        if (parent) {
            parent.scrollTo({
                left: parent.scrollLeft + 390,
                behavior: 'smooth',
            })
        }
    }, [])


    if (!mounted) return <></>

    return (
        <div className='flex md:w-max w-full items-center mx-auto'>
            <Button variant={"outline"} className={cn("rounded-full p-0 w-7 h-7 hidden md:flex")}
                onClick={handleScrollPrevious}>
                <ChevronLeft className="w-6 h-6" />
            </Button>
            <div
                ref={parentRef}
                className="w-full md:max-w-[580px] mx-auto px-3 flex border-b 
                md:border-none hideScrollbar mt-4 gap-5"
                style={{
                    width: `100%`,
                    height: `100px`,
                    overflow: 'auto',
                }}>

                <UploadYourStory />
                <div
                    style={{
                        width: `${columnVirtualizer.getTotalSize()}px`,
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                        <div
                            key={virtualColumn.index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: `${virtualColumn.size}px`,
                                transform: `translateX(${virtualColumn.start}px)`,
                            }}
                        >
                            <StoryItem key={virtualColumn.index} story={data[virtualColumn.index]} />
                        </div>
                    ))}
                </div>
            </div>
            <Button variant={"outline"} className={cn("rounded-full p-0 w-7 h-7 hidden md:flex")}
                onClick={handleScrollNext}>
                <ChevronRight className="w-6 h-6" />
            </Button>
        </div>
    )
})