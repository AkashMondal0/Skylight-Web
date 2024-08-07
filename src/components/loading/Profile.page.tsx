import { Skeleton } from "@/components/ui/skeleton"

export const ProfileHeaderLoading = () => {
    return (
        <div className='mx-auto max-w-[960px]'>
            {/* md ->>> */}
            <div className="hidden sm:block">
                {/* profile header */}
                <div className='flex items-center my-8 px-5'>
                    <Skeleton className='sm:w-36 object-cover sm:h-36 w-28 h-28 rounded-full sm:mr-8' />
                    <div className='flex flex-col justify-between gap-5'>
                        <div className='items-center sm:flex space-x-2 space-y-2'>
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
            </div>

            {/* <<<- sm */}
            <div className='sm:hidden'>
                {/* profile header */}
                <div className='flex gap-3 my-5 items-center px-2'>
                    <Skeleton className='w-24 h-24 rounded-full' />
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2 px-3'>
                            <Skeleton className='w-20 h-6 rounded-xl' />
                        </div>
                        <div className='flex justify-between gap-2 px-3'>
                            <div className='flex gap-1'>
                                <Skeleton className='w-16 h-6 rounded-xl' />
                            </div>
                            <>
                                <div className='sm:cursor-pointer flex gap-1'>
                                    <Skeleton className='w-16 h-6 rounded-xl' />

                                </div>
                            </>
                            <>
                                <div className='sm:cursor-pointer flex gap-1'>
                                    <Skeleton className='w-16 h-6 rounded-xl' />

                                </div>
                            </>
                        </div>
                    </div>
                </div>
                {/*  */}

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
            </div>
        </div>)
}

export const ProfilePostLoading = () => {
    return <div className="grid grid-cols-3 gap-1 w-full">
        {Array(9).fill(0).map((post, index) => (
            <Skeleton key={index} className='aspect-square w-full h-full object-cover' />
        ))}
    </div>
}