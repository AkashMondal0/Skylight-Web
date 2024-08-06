import { ChevronLeft } from "lucide-react"
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

        <div className='px-2 h-16 sticky bottom-0 z-1 my-2 border-t pt-2 flex gap-1 items-center'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-10 w-full rounded-3xl flex-1" />
            <Skeleton className="h-10 w-10 rounded-2xl" />
        </div>
    </div>
}

export const CommentPageLoading = () => {
    return <div className='w-full min-h-dvh mx-auto flex flex-col max-w-[600px]'>
        <div className="flex justify-between items-center w-full h-14 border-b">
            <div className='md:hidden cursor-pointer'>
                <ChevronLeft size={30} />
            </div>
            <div className='text-xl font-semibold'>
                Comments
            </div>
            <div className='w-10' />
        </div>
        <div className="flex-col flex gap-2 px-3 my-2 w-full">
            <div className="flex border-b py-4 mb-4">
                <Skeleton className='h-12 w-12 rounded-full border-fuchsia-500 border-[3px] p-[2px]' />
                <div className="flex flex-col ml-2 space-y-1">
                    <Skeleton className='w-40 h-4' />
                    <Skeleton className='w-28 h-4' />
                </div>
            </div>
            {Array(20).fill(0).map((_, i) => <div key={i} className="flex gap-1 items-center justify-between">
                <div className="flex">
                    <Skeleton className='h-12 w-12 rounded-full border-fuchsia-500 border-[3px] p-[2px]' />
                    <div className="flex flex-col ml-2 space-y-1">
                        <Skeleton className='w-40 h-4' />
                        <Skeleton className='w-28 h-4' />
                    </div>
                </div>
                <Skeleton className='w-5 h-5' />
            </div>)}
        </div>

        <div className='px-2 sm:hidden h-16 sticky bottom-0 z-1 my-2 border-t py-2 flex gap-1 items-center bg-background'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-10 w-full rounded-3xl flex-1" />
            <Skeleton className="h-10 w-10 rounded-2xl" />
        </div>
    </div>
}

export const CommentListLoading = () => {
    return (<div className="p-4 space-y-2">

        {Array(20).fill(0).map((_, i) => <div key={i} className="flex gap-1 items-center justify-between">
            <div className="flex">
                <Skeleton className='h-12 w-12 rounded-full border-fuchsia-500 border-[3px] p-[2px]' />
                <div className="flex flex-col ml-2 space-y-1">
                    <Skeleton className='w-40 h-4' />
                    <Skeleton className='w-28 h-4' />
                </div>
            </div>
            <Skeleton className='w-5 h-5' />
        </div>)}</div>)
}