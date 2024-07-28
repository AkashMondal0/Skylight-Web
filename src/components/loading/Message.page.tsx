import { ScrollArea } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"

export const SkeletonProfilePage = () => {
    return <div className='w-full min-h-[100dvh] overflow-x-hidden overflow-hidden'>
        {/* <ProfileHeader name="loading..." /> */}
        <div className='mx-auto max-w-[960px]'>
            {/* md ->>> */}
            <div className="hidden sm:block">
                {/* profile header */}
                <div className='flex items-center my-8 m-5'>
                    <Skeleton className='sm:w-36 object-cover sm:h-36 w-28 h-28 rounded-full sm:mr-8' />
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

export const UserCardLoading = () => {

    return <div className='flex justify-between my-4'>
        <div className='flex space-x-2 items-center cursor-pointer'>
            <Skeleton className="h-[3.3rem] w-[3.3rem] rounded-full mx-auto" />
            <div className="space-y-1">
                <div className='font-semibold text-base'>
                    <Skeleton className="h-4 w-[150px]" />
                </div>
                <div className='text-sm'>
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
        <div className='flex items-center'>
        </div>
    </div>
}

export const LoadingMessageSidebar = () => {
    return <div className={`md:border-r scroll-smooth duration-300 px-4 overflow-hidden
    hideScrollbar h-dvh md:max-w-[22rem] ease-in-out w-full`}>
        <div className='w-full my-4'>
            <div className="flex justify-between w-full items-center my-5">
                <Skeleton className="h-8 w-24" />
                <div>
                    <Skeleton className="h-8 w-8 mx-4" />
                </div>
            </div>
            <div className="flex items-center justify-between py-3 w-full">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
            </div>
        </div>
        <div className=" space-y-4">
            {[...Array(15)].map((_, i) => (<UserCardLoading key={i} />))}
        </div>
    </div>
}

export const MessagePageSkeleton = () => {
    return <div className='w-full h-[100dvh] flex flex-col'>
        <div className='flex my-4 px-2 h-[4.5rem] border-b pb-2'>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className='flex flex-col'>
                <Skeleton className="h-5 w-72 m-1" />
                <Skeleton className="h-4 w-52 m-1" />
            </div>
        </div>
        <ScrollArea className="flex-grow px-4 my-2 w-full">
            {Array(14).fill(0).map((_, i) => <div key={i} className="flex flex-col">
                <Skeleton className={`h-12 w-40 rounded-2xl my-2 
            ${Math.floor(Math.random() * 12) > 6 ? "ml-auto" : ""}`} />
            </div>)}
        </ScrollArea>

        <div className='px-2 h-16 sticky bottom-0 z-1 my-2 border-t pt-2'><Skeleton className="h-10 w-full rounded-3xl" /></div>
    </div>
}