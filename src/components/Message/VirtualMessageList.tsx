import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual';
import { Conversation } from '@/types';
import { useSession } from 'next-auth/react';
import { MessageItem } from './MessageItem';
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;

const VirtualizeMessageList = ({
    conversation,
    loadMore,
    Header,
    Footer,
}: {
    conversation: Conversation
    loadMore?: () => void
    Header?: React.ReactNode
    Footer?: React.ReactNode
}) => {
    const session = useSession().data?.user
    const parentRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    // const dimension = useWindowDimensions()
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => conversation.messages, [conversation.messages])
    const count = useMemo(() => data.length, [data.length])
    // 
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 50, []),
        overscan: 12,
        enabled: true,
        initialOffset: _kSavedOffset,
        initialMeasurementsCache: _KMeasurementsCache,
        onChange: (virtualizer) => {
            if (!virtualizer.isScrolling) {
                _KMeasurementsCache = virtualizer.measurementsCache;
                _kSavedOffset = virtualizer.scrollOffset || 0;
            }
        },
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const items = virtualizer.getVirtualItems()

    const toBottom = useCallback(() => {
        bottomRef.current?.scrollIntoView()
    }, [data.length])

    useEffect(() => {
        toBottom()
    }, [data.length]);

    if (!mounted) return <></>

    return (
        <>
            <div ref={parentRef}
                className='h-full w-full flex-1' id='style-1'
                style={{
                    height: "100%",
                    width: '100%', overflowY: 'auto', contain: 'strict'
                }}>
                {Header}
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
                    }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            padding: 4,
                            transform: `translateY(${items[0]?.start ?? 0}px)`,
                        }}>
                        {items.map((virtualRow) => (
                            <div key={virtualRow.key}
                                data-index={virtualRow.index}
                                ref={virtualizer.measureElement}>
                                <MessageItem
                                    isProfile={session?.id === data[virtualRow.index].authorId}
                                    data={data[virtualRow.index]} />
                            </div>
                        ))}
                        <div id="bottom" ref={bottomRef} />
                    </div>
                </div>
                {Footer}
            </div>
        </>
    )
}

export default VirtualizeMessageList