import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUserCard() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}


export const SkeletonUserCardWithButton = () => {

  return (
    <>
      <div className='flex justify-between px-2 my-4'>
        <div className='flex space-x-2 items-center'>
          <Skeleton className='h-12 w-12 mx-auto rounded-full' />
          <div className='space-y-1'>
            <div className='font-semibold text-base'>
              <Skeleton className='w-28 h-4' />
            </div>
            <div className='text-sm'>
              <Skeleton className='w-16 h-3' />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <Skeleton className='w-20 h-9 rounded-xl' />
        </div>
      </div>
    </>
  )
}