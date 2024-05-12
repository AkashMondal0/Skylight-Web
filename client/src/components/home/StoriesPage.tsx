import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import StoryAvatar from './Card/StoriesCard'

export default async function StoriesPage() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <>
      <Carousel
        className="w-full max-w-[580px] mx-auto mt-4 mb-2 md:flex hidden">
        <CarouselContent>
          {Array(100).fill(0).map((_, index) => (
            <CarouselItem key={index} className="basis-1/7">
              <StoryAvatar />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ScrollArea className='max-w-[630px] w-full mb-5 mt-3 mx-auto md:hidden'>
        <div className='flex space-x-2 px-2'>
          {Array(100).fill(0).map((_, i) => <StoryAvatar key={i} />)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}

