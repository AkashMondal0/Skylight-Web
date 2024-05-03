'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const StoryAvatar = ({
  url = "/user.jpg",
  label = "loading"
}: {
  url?: string
  label?: string
}) => {
  return <div>
    <Avatar className='h-16 w-16 mx-auto border-fuchsia-500 border-[3px] p-[2px]'>
      <AvatarImage src={url} alt="@shadcn" className='rounded-full' />
      <AvatarFallback>{label}</AvatarFallback>
    </Avatar>
    <div className="text-xs font-normal text-center">akash</div>
  </div>
}

export default StoryAvatar