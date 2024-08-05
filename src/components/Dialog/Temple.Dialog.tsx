"use client"
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const TempleDialog = ({
    TriggerChildren,
    children,
    headerTitle,
    header,
    onOpenChange,
    footer,
    open
}: {
    TriggerChildren?: React.ReactNode
    children: React.ReactNode
    headerTitle?: string
    header?: React.ReactNode
    footer?: React.ReactNode
    open?: boolean
    onOpenChange?: (e: boolean) => void
}) => {
    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogTrigger asChild>
                {TriggerChildren}
            </DialogTrigger>
            <DialogContent className="p-0 h-[70%] overflow-hidden w-[96%]" style={{ borderRadius: 30 }}>
                <div className='flex flex-col overflow-hidden h-full'>
                    {headerTitle ? <h1 className="font-semibold text-xl text-center border-b py-4 flex-none mx-5">{headerTitle}</h1> : <></>}
                    {header}
                    <div className='px-4 flex-1 overflow-y-auto scrollbarStyle'>
                        <div className='h-full'>
                            {children}
                        </div>
                    </div>
                    {footer}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const TempleAlertDialog = ({
    TriggerChildren,
    children,
    headerTitle,
    header,
    onOpenChange,
    footer
}: {
    TriggerChildren: React.ReactNode
    children: React.ReactNode
    headerTitle?: string
    header?: React.ReactNode
    footer?: React.ReactNode
    onOpenChange?: (e: boolean) => void
}) => {
    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <div className='w-auto h-auto'>
                    {TriggerChildren}
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden w-[96%] max-w-[450px]" style={{ borderRadius: 30 }}>
                <div className='flex flex-col overflow-hidden h-full'>
                    {headerTitle ? <h1 className="font-semibold text-lg text-center border-b py-4 flex-none mx-5">{headerTitle}</h1> : <></>}
                    {header}
                    <div className='px-4 flex-1 overflow-y-auto scrollbarStyle'>
                        <div>
                            {children}
                        </div>
                    </div>
                    {footer}
                </div>
            </DialogContent>
        </Dialog>
    )
}