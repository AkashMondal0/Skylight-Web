import { ScrollArea } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"

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

export const UserCardListSkeleton = () => {
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