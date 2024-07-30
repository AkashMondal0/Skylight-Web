import { Skeleton } from "../ui/skeleton"

export const PostLoading = ({ size = 1 }: { size?: number }) => {
    return (
        <>{Array(size).fill(0).map(() => {
            return (
                <div className='sm:max-w-[480px] w-full sm:mx-auto py-6 border-b p-1'>
                    {/* post header */}
                    <div className='flex justify-between px-2'>
                        <div className='flex space-x-2 items-center cursor-pointer'>
                            <Skeleton className='h-12 w-12 mx-auto p-[2px] rounded-full' />
                            <div className="space-y-2">
                                <Skeleton className='h-4 w-60 p-[2px]' />
                                <Skeleton className='h-4 w-32 p-[2px]' />
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Skeleton className='h-4 w-10 mx-auto p-[2px]' />
                        </div>
                    </div>
                    {/* post image */}
                    <div className='px-[2px] w-auto h-auto m-auto my-2'>
                        <Skeleton className='h-[500px] w-full rounded-xl' />
                    </div>
                    {/* PostActions */}
                    <div className=' mt-5 mb-1 mx-3 flex justify-between'>
                        <div className='flex space-x-3'>
                            <Skeleton className='h-4 w-40 rounded-xl' />
                        </div>
                        <Skeleton className='h-5 w-5' />
                    </div>
                    {/* PostComments */}
                    <div className='mx-3 space-y-2'>
                        {/* close friend comments */}
                        <div className='flex space-x-2'>
                            <div>
                                <Skeleton className='h-4 w-20 rounded-xl' />
                            </div>
                        </div>
                        <Skeleton className='h-4 w-80 rounded-xl' />
                    </div>
                </div >)
        })}</>
    )
}