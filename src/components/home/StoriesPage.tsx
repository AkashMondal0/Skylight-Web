"use client"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import StoryAvatar, { YourStory } from './Card/StoriesCard'
import { generateRandomUsername } from '../sky/random';

function StoriesPage() {
  const [isReady, setIsReady] = useState(true)
  const data = Array.from({ length: 20 }, (_, i) => {
    return {
      url: `https://picsum.photos/id/${100 + i}/${50}/${50}`,
      label: `${generateRandomUsername()}`
    }
  })

  useEffect(() => {
    setIsReady(false)
  }, [])

  if (isReady) return <></>
  
  return (
    <>
      <Carousel
        className="w-full max-w-[580px] mx-auto mt-4 mb-2 md:flex hidden">
        <CarouselContent>
          <CarouselItem className="basis-1/7">
            <YourStory />
          </CarouselItem>
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-1/7">
              <StoryAvatar url={item.url} label={item.label} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ScrollArea className='max-w-[630px] w-full mb-5 mt-3 mx-auto md:hidden'>
        <div className='flex space-x-2 px-2'>
          <YourStory />
          {data.map((item, index) => (
            <StoryAvatar url={item.url} label={item.label} key={index}/>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}

export default StoriesPage
