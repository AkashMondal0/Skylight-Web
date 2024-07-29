"use client"
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const TempleListDialog = ({
    TriggerChildren,
    children,
    headerTitle
}: {
    TriggerChildren: React.ReactNode
    children: React.ReactNode
    headerTitle: string
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {TriggerChildren}
            </DialogTrigger>
            <DialogContent className="p-0 h-[70%] overflow-hidden" style={{ borderRadius: 30 }}>
                <div className='flex flex-col overflow-hidden'>
                    <h1 className="font-semibold text-xl text-center border-b py-4 flex-none mx-5">{headerTitle}</h1>
                    <div className='px-4 flex-1 overflow-y-auto scrollbarStyle'>
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const TempleDialog = ({
    TriggerChildren,
    children,
    headerTitle,
    onChange
}: {
    TriggerChildren: React.ReactNode
    children: React.ReactNode
    headerTitle?: string
    onChange?: (e: boolean) => void
}) => {
    return (
        <Dialog onOpenChange={onChange}>
            <DialogTrigger asChild>
                {TriggerChildren}
            </DialogTrigger>
            <DialogContent className="p-0 h-[70%] overflow-hidden" style={{ borderRadius: 30 }}>
                <div className='flex flex-col overflow-hidden h-full'>
                    {headerTitle ?<h1 className="font-semibold text-xl text-center border-b py-4 flex-none mx-5">{headerTitle}</h1>:<></>}
                    <div className='px-4 flex-1 overflow-y-auto scrollbarStyle'>
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

