import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

const NotificationModel = ({ children }: { children: React.ReactNode }) => {
    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='w-96 h-[100dvh] overflow-y-auto p-4'>
                <div className='w-full space-y-4 py-4 mb-4'>
                    <h2 className='text-2xl font-semibold'>Notification</h2>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default NotificationModel
