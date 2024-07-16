'use client'
import SkyAvatar from "@/components/sky/SkyAvatar"
import { Plus } from "lucide-react"

const StoryAvatar = ({
  url = "/user.jpg",
  label = "akash"
}: {
  url?: string
  label?: string
}) => {
  return <div className="w-16">
    <SkyAvatar url={url} className={'rounded-full object-cover h-16 w-16 border-fuchsia-500 border-[3px] p-[2px]'} />
    <p className="text-xs font-normal text-center">{label}</p>
  </div>
}

export default StoryAvatar

export const YourStory = () => {
  return <div className="w-16">
    <div className='w-16 h-16 border-[2px] rounded-full flex justify-center items-center cursor-pointer'>
      <Plus className='w-10 h-10' />
    </div>
    <p className="text-xs font-normal text-center">Your Story</p>
  </div>

}
