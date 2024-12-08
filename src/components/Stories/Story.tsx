"use client"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AvatarItem, UploadYourStory } from '@/components/Stories/StoryItem';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RootState } from '@/redux-stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountStoryTimelineApi } from '@/redux-stores/slice/account/api.service';

let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[];
export const Stories = memo(function Story({ }) {
    const storyList = useSelector((state: RootState) => state.AccountState.storyAvatars)
    const totalFetchedItemCount = useSelector((state: RootState) => state.AccountState.storyAvatarsFetched)
    const stopRef = useRef(false)
    const dispatch = useDispatch()

    const parentRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const count = useMemo(() => storyList.length, [storyList.length])

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 80, []),
        overscan: 5,
    })
    // const items = columnVirtualizer.getVirtualItems()

    const fetchApi = useCallback(async () => {
        if (stopRef.current || totalFetchedItemCount) return
        stopRef.current = true
        try {
            await dispatch(fetchAccountStoryTimelineApi({
                limit: 12,
                offset: storyList.length,
            }) as any)
        } finally {
            stopRef.current = false
        }
    }, [totalFetchedItemCount])

    useEffect(() => {
        if (!mounted) {
            fetchApi()
            setMounted(true)
        }
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
        <div className='flex md:w-max w-full items-center mx-auto md:min-w-[580px] min-w-full'>
            <Button variant={"outline"} className={cn("rounded-full p-0 w-7 h-7 hidden md:flex")}
                onClick={handleScrollPrevious}>
                <ChevronLeft className="w-6 h-6" />
            </Button>
            <div
                ref={parentRef}
                className="w-full md:max-w-[580px] mx-auto px-3 flex border-b 
                md:border-none hideScrollbar mt-4"
                style={{
                    width: `100%`,
                    height: `100px`,
                    overflow: 'auto',
                }}>
                <UploadYourStory className='w-16 h-16' />
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
                            <AvatarItem key={virtualColumn.index} data={storyList[virtualColumn.index]} />
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
