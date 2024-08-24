import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual';
import { Conversation } from '@/types';
import { useSession } from 'next-auth/react';
import { MessageItem } from './MessageItem';
import { Loader2 } from 'lucide-react';
import { debounce } from 'lodash';
let _kSavedOffset = 0;
let _KMeasurementsCache = [] as any // as VirtualItem[] ;

const VirtualizeMessageList = ({
    conversation,
    loadMore,
    Header,
    Footer,
    loadMoreMessageLoading
}: {
    conversation: Conversation
    loadMore: (conversationId: string) => Promise<boolean>
    Header?: React.ReactNode
    Footer?: React.ReactNode
    loadMoreMessageLoading?: boolean
}) => {
    const session = useSession().data?.user
    const parentRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const data = useMemo(() => conversation.messages, [conversation.messages])
    const count = useMemo(() => data.length, [data.length])
    const stopFetch = useRef(false)
    const initialLoad = useRef(true)

    const fetchMore = debounce(async () => {
        await loadMore(conversation?.id).then((res) => {
            if (res) {
                return virtualizer.scrollToIndex(20 + (virtualizer?.range?.endIndex ?? 0))
            }
        }).finally(() => {
            stopFetch.current = false
        })
    }, 1000)

    // 
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => 200, []),
        overscan: 30,
        initialOffset: _kSavedOffset,
        initialMeasurementsCache: _KMeasurementsCache,
        onChange: (virtualizer) => {
            if (!virtualizer.isScrolling) {
                _KMeasurementsCache = virtualizer.measurementsCache;
                _kSavedOffset = virtualizer.scrollOffset || 0;
            }
            if (!virtualizer?.range?.startIndex) return
            if (virtualizer?.range?.startIndex <= 3
                && virtualizer?.scrollDirection === "backward"
                && !stopFetch.current) {
                stopFetch.current = true
                fetchMore()
                // console.log('fetching more', virtualizer?.range?.startIndex, virtualizer?.scrollDirection)
            }
        },
    })
    const items = virtualizer.getVirtualItems()


    useEffect(() => {
        if (items.length > 0 && initialLoad.current) {
            const totalHeight = virtualizer.getTotalSize()
            virtualizer.scrollToOffset(totalHeight);
            initialLoad.current = false
        }
    }, [items.length, virtualizer]);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <></>

    return (
        <>
            <div ref={parentRef}
                className='h-full w-full flex-1 hideScrollbar' id='style-1'
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
                        <div className='w-full h-12'>
                            {!loadMoreMessageLoading ? <></> : <Loader2 className="animate-spin w-12 h-12 mx-auto my-5 text-accent" />}
                        </div>
                        {items.map((virtualRow) => (
                            <div key={virtualRow.key}
                                // className='outline outline-red-500'
                                data-index={virtualRow.index}
                                ref={virtualizer.measureElement}>
                                {/* <>{virtualRow.index}</> */}
                                <MessageItem
                                    key={virtualRow.index}
                                    data-index={virtualRow.index}
                                    seen={conversation?.messagesAllRead ? true : data[virtualRow.index].seenBy.length === conversation?.members.length}
                                    isProfile={session?.id === data[virtualRow.index].authorId}
                                    data={data[virtualRow.index]} />
                            </div>
                        ))}
                    </div>
                </div>
                {Footer}
            </div>
        </>
    )
}

export default VirtualizeMessageList