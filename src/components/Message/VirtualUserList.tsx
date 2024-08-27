import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual';
import { Conversation } from '@/types';
import { MessageUserListItem } from './MessageUserListItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;

export const VirtualUserList = ({
    conversation,
    loadMore,
    Header,
    Footer,
}: {
    conversation: Conversation[]
    loadMore?: () => void
    Header?: React.ReactNode
    Footer?: React.ReactNode
}) => {
    const parentRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const currentTyping = useSelector((Root: RootState) => Root.conversation.currentTyping)
    const count = useMemo(() => conversation.length, [conversation.length])

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
    if (!mounted) return <></>

    return (
        <div className='h-dvh w-full'>
            <div ref={parentRef}
                id='style-1'
                style={{
                    height: "100%",
                    width: '100%', overflowY: 'auto', contain: 'strict'
                }}>
                {Header}
                <div style={{
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
                                <MessageUserListItem
                                    currentTyping={currentTyping?.conversationId
                                        === conversation[virtualRow.index].id
                                        && currentTyping?.typing}
                                    data={conversation[virtualRow.index]}
                                    key={conversation[virtualRow.index].id} />
                            </div>
                        ))}
                    </div>
                </div>
                {Footer}
            </div>
        </div>
    )
}