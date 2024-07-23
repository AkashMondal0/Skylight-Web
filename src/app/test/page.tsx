'use client'
import { getRandomPost } from '@/components/sky/random';
import useWindowDimensions from '@/lib/useWindowDimensions';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { memo, useEffect, useState } from 'react';
const data = getRandomPost(300)

const RenderText = memo(function renderText({ text }: { text: string }) {
  console.log("render text component")
  return <>
    <div>{text}</div>
  </>
})


export default function RowVirtualizerDynamic() {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const dimension = useWindowDimensions()
  const [mounted, setMounted] = useState(false)
  const [enabled, setEnabled] = React.useState(true)

  const count = data.length
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    enabled,
  })

  useEffect(()=>{
    setMounted(true)
  },[])

  const items = virtualizer.getVirtualItems()

  if (!dimension.isMounted || !mounted) return <>dimension.isMounted</>

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: dimension.height ?? "100%",
          width: '100%',
          overflowY: 'auto',
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >Header
            {dimension.height}

            {items.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className={
                  virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                }
              >
                <div style={{ padding: '10px 0' }}>
                  <div>Row {virtualRow.index}</div>
                  <div>{data[virtualRow.index].content}</div>
                  <RenderText text={data[virtualRow.index].content} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}