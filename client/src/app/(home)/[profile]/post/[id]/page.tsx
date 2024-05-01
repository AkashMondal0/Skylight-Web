/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const page = () => {
  return <PostR />
}

export default page


export const PostR = () => {
  return <div>
    <Dialog open>
      <DialogContent className="h-[95dvh] p-0 max-w-[70dvw]">
        <div className="flex">
          <div className="flex-1 flex justify-center items-center">
            <img src={"/user.jpg"}
              alt="avatar"
              height={700}
              width={500}
              className="aspect-auto rounded-lg"
            />
          </div>
          {/* right side */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="w-full h-[94dvh]">
            <div className="flex justify-between bg-background
            items-center p-4 border-b h-20 z-10 sticky top-0">
              <div className="flex gap-2 items-center">
                <Avatar className='h-12 w-12 border-fuchsia-500 border-[3px] p-[2px]'>
                  <AvatarImage src={"/user.jpg"}
                    alt="@shadcn" className='rounded-full' />
                </Avatar>
                <div className="font-semibold text-lg">User Name</div>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                  <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
                </svg>
              </div>
            </div>
              {Array(200).fill(0).map((_, i) => <div key={i}>{i}</div>)}
            <div className="w-full h-16 border bottom-0 sticky z-10 bg-background"></div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
}
