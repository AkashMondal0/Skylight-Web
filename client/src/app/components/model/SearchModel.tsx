import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

const SearchModel = ({ children }: { children: React.ReactNode }) => {
    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='w-96 h-[100dvh] overflow-y-auto'>
                Search
            </DrawerContent>
        </Drawer>
    )
}

export default SearchModel
