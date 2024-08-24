import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StoryItem, UploadYourStory } from '@/components/Stories/StoryItem';
import { useVirtualizer } from '@tanstack/react-virtual';
import { generateRandomUsername } from '../sky/random';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { User } from '@/types';
const story = Array.from({ length: 30 }, (_, i) => {
  return {
    url: `https://picsum.photos/id/${100 + i}/${50}/${50}`,
    label: `${generateRandomUsername()}`
  }
})
interface StoriesProp {
  url: string
  label: string
}
export const ProfileStories = memo(function ProfileStories({
  user,
  isProfile,
  stories
}: {
  user: User,
  isProfile: boolean
  stories?: StoriesProp[]
}) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const data = useMemo(() => story, [])
  const count = useMemo(() => data.length, [data.length])

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: count,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 100, []),
    overscan: 10,
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
    <div className='flex w-full items-center mx-auto'>
      <Button variant={"outline"} className={cn("rounded-full p-0 w-7 h-7 hidden md:flex")}
        onClick={handleScrollPrevious}>
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <div
        ref={parentRef}
        className="mx-auto flex hideScrollbar"
        style={{
          width: `100%`,
          height: `100%`,
          overflow: 'auto',
        }}>
        {/* UploadYourStory */}
        <div className='md:h-24 h-20 w-max'>
          {isProfile ? <UploadYourStory /> : <></>}
        </div>
        {/* other stories*/}
        <div
          style={{
            width: `${columnVirtualizer.getTotalSize()}px`,
            height: '100%',
            position: 'relative',
          }}>
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
              <StoryItem key={virtualColumn.index}
                story={data[virtualColumn.index]}
                className='md:w-20 md:h-20 h-16 w-16' />
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
}, ((prevProps, nextProps) => prevProps.isProfile === nextProps.isProfile &&
  prevProps.user.id === nextProps.user.id
))