import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StoryItem, UploadYourStory } from '@/components/Stories/StoryItem';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Highlight, User, disPatchResponse, loadingType } from '@/types';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { fetchUserHighlightApi } from '@/redux-stores/slice/profile/api.service';

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
  const [state, setState] = useState<{
    loading: loadingType,
    error: boolean,
    data: Highlight[]
  }>({
    data: [],
    error: false,
    loading: "idle",
  })
  const count = useMemo(() => state.data.length, [state.data.length])
  const totalFetchedItemCount = useRef<number>(0)
  const dispatch = useDispatch()

  const fetchApi = useCallback(async () => {
    if (totalFetchedItemCount.current === -1 || state.loading === "pending") return
    try {
      setState((prev) => ({ ...prev, loading: "pending" }))
      if (!user?.id) return toast.error("User id not found")
      const res = await dispatch(fetchUserHighlightApi({
        limit: 12,
        offset: totalFetchedItemCount.current,
        id: user?.id
      }) as any) as disPatchResponse<Highlight[]>
      if (res.error) {
        totalFetchedItemCount.current = -1
        setState((prev) => ({ ...prev, loading: "normal", error: true }))
        return
      }
      setState((prev) => ({
        ...prev,
        loading: "normal",
        data: [...prev.data, ...res.payload]
      }))
      if (res.payload.length >= 12) {
        totalFetchedItemCount.current += res.payload.length
        return
      }
      totalFetchedItemCount.current = -1
    } finally {
      setState((prev) => ({ ...prev, loading: "normal" }))
    }
  }, [user?.id, totalFetchedItemCount.current])

  useEffect(() => {
    fetchApi()
  }, [])

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
          {isProfile ? <UploadYourStory className='md:w-20 md:h-20 h-16 w-16 ' /> : <></>}
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
                data={state.data[virtualColumn.index]}
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