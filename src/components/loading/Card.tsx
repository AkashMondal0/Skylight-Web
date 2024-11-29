import { Skeleton } from "@/components/ui/skeleton"


export const LoadingUserCardWithButton = () => {

  return (
    <div className='flex cursor-pointer py-2 px-2 justify-between 
    duration-300 ease-in-out transition-all delay-75 rounded-xl'>
      <div className='flex space-x-2 items-center cursor-pointer justify-between w-full'>
        <div className="flex-none">
          <Skeleton className='h-12 w-12 mx-auto rounded-full' />
        </div>

        <div className="grow space-y-1">
          <Skeleton className='w-28 h-4' />
          <Skeleton className='w-16 h-4' />
        </div>

        <div
          className='flex items-center flex-col flex-none h-12 w-12'>
          <Skeleton className='w-14 h-8 rounded-xl' />
        </div>
      </div>
    </div>
  )
}