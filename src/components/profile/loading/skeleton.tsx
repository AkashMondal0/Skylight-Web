import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
export const SkeletonFollowUserCard = () => {

    return (
        <>
            <div className='flex justify-between px-2'>
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
const SkeletonProfile = () => {
    return <div className='w-full min-h-[100dvh] overflow-x-hidden'>
        <div className='mx-auto max-w-[960px]'>
            {/* md ->>> */}
            <div className="hidden sm:block">
                {/* profile header */}
                <div className='flex items-center my-8 m-5'>
                    <Skeleton className='sm:w-28 w-36 sm:h-28 h-36 rounded-full sm:mr-8' />
                    <div className='flex flex-col justify-between gap-5'>
                        <div className='flex justify-between gap-2 items-center'>
                            <Skeleton className='w-32 h-6 rounded-xl' />
                            <Skeleton className='w-32 h-10 rounded-xl' />
                            <Skeleton className='w-32 h-10 rounded-xl' />
                            <Skeleton className='w-8 h-8 rounded-xl' />
                        </div>

                        <div className='flex justify-between px-3'>
                            <div className='flex gap-1'>
                                <Skeleton className='w-20 h-6 rounded-xl' />
                            </div>
                            <>
                                <div className='sm:cursor-pointer flex gap-1'>
                                    <Skeleton className='w-20 h-6 rounded-xl' />

                                </div>
                            </>
                            <>
                                <div className='sm:cursor-pointer flex gap-1'>
                                    <Skeleton className='w-20 h-6 rounded-xl' />

                                </div>
                            </>
                        </div>

                        <div className='flex justify-between flex-col px-3 my-4 space-y-2'>
                            <Skeleton className='w-40 h-6 rounded-xl' />
                            <Skeleton className='w-72 h-5 rounded-xl' />
                            <Skeleton className='w-80 h-6 rounded-xl' />
                        </div>
                    </div>
                </div>
                {/* story */}
                <div className='flex gap-10 m-5 my-10'>
                    <Skeleton className='w-20 h-20 rounded-full' />
                </div>
                {/* post */}
                <div className="grid grid-cols-3 gap-1 p-1">
                    {Array(9).fill(0).map((post, index) => (
                        <Skeleton key={index} className='aspect-square rounded-none w-full h-full object-cover' />
                    ))}
                </div>
                <div className='h-10 w-full'></div>
            </div>

            {/* <<<- sm */}
            <div className='sm:hidden'>
                {/* profile header */}
                <div className='flex gap-3 my-5 items-center px-2'>
                    <Skeleton className='w-24 h-24 rounded-full' />
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <Skeleton className='w-20 h-6 rounded-xl' />
                        </div>
                        <div className='flex justify-between gap-2 px-3'>
                            <div className='flex gap-1'>
                                <Skeleton className='w-20 h-6 rounded-xl' />
                            </div>
                            <>
                                <div className='sm:cursor-pointer flex gap-1'>
                                    <Skeleton className='w-20 h-6 rounded-xl' />

                                </div>
                            </>
                            <>
                                <div className='sm:cursor-pointer flex gap-1'>
                                    <Skeleton className='w-20 h-6 rounded-xl' />

                                </div>
                            </>
                        </div>
                    </div>
                </div>
                {/*  */}
                <>
                    <div className='flex justify-between flex-col px-3 space-y-2'>
                        <Skeleton className='w-40 h-6 rounded-xl' />
                        <Skeleton className='w-72 h-5 rounded-xl' />
                        <Skeleton className='w-80 h-6 rounded-xl' />
                    </div>

                    {/* stories */}
                    <div className='flex gap-5 my-5 px-2'>
                        <Skeleton className='w-16 h-16 rounded-full' />
                        <Skeleton className='w-16 h-16 rounded-full' />
                        <Skeleton className='w-16 h-16 rounded-full' />
                    </div>

                    {/* followers and following */}
                    <div className='flex justify-around p-2 border-y'>
                        <div className='text-center'>
                            <Skeleton className='w-24 h-12 rounded-xl' />
                        </div>

                        <div className='cursor-pointer text-center' >
                            <Skeleton className='w-24 h-12 rounded-xl' />
                        </div>

                        <div className='cursor-pointer text-center'>
                            <Skeleton className='w-24 h-12 rounded-xl' />
                        </div>

                    </div>

                </>
                {/* posts */}
                <div className="grid grid-cols-3 gap-1 w-full p-1">
                    {Array(9).fill(0).map((post, index) => (
                        <Skeleton key={index} className='aspect-square w-full h-full object-cover' />
                    ))}
                </div>
                <div className='h-10 w-full'></div>
            </div>

        </div>
    </div >
}

export default SkeletonProfile


export const SkeletonUserCardFollowPage = ({title}: {title:string}) => {
    return <div className='w-full flex justify-center min-h-[100dvh] h-full'>
        <div className='max-w-[600px] w-full p-4'>
            <h1 className="font-semibold text-lg text-center mb-4">{title}</h1>
            <Separator />
            <div className='h-5' />

            <>{Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}</>
        </div>
    </div>
}

const SkeletonUserCard = () => {

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