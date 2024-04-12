import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { X } from 'lucide-react'

const SearchModel = ({ children }: { children: React.ReactNode }) => {
    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='w-96 h-[100dvh] overflow-y-auto p-4'>
                <div className='w-full space-y-4 py-4 mb-4'>
                    <h2 className='text-2xl font-semibold'>Search</h2>
                    <div className={`w-full p-2 px-4 border bg-secondary my-4
                    text-secondary-foreground rounded-xl focus:outline-none focus:ring-0`}>
                        <input type="text" placeholder='Search'
                            className='w-full bg-transparent focus:outline-none focus:ring-0' />
                    </div>
                </div>
                <div className='flex justify-between m-2'>
                    <div className='font-semibold'>Recent</div>
                    <div className='text-primary text-blue-00'>Clear All</div>
                </div>
                {[...Array(50)].map((_, i) => <UserCard key={i} />)}
            </DrawerContent>
        </Drawer>
    )
}

export default SearchModel


const UserCard = ({
    url = "https://github.com/shadcn.png",
}: {
    url?: string
}) => {
    return (
        <>
            <div className='flex justify-between p-2 hover:bg-secondary hover:text-secondary-foreground rounded-2xl my-1'>
                <div className='flex space-x-2 items-center'>
                    <Avatar className='h-12 w-12 mx-auto'>
                        <AvatarImage src={url}
                            alt="@shadcn" className='rounded-full' />
                    </Avatar>
                    <div>
                        <div className='font-semibold text-base'>akashmondal0</div>
                        <div className='text-sm'>
                            Akash Mondal
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <X />
                </div>
            </div>
        </>
    )
}