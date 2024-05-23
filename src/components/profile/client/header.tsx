import { AtSign, ChevronDown, Menu, Settings } from 'lucide-react'
import React from 'react'

const ProfileHeader = ({ name, isProfile }: { name: string, isProfile?: boolean }) => {
    if (isProfile) {
        return (
            <div>
                <div className="md:hidden flex fixed top-0 z-10 w-full border-b h-14 bg-background text-foreground">
                    <div className="p-4 w-full flex justify-between">
                        <AtSign size={28} />
                        <span className="text-xl flex gap-1">{name} <ChevronDown className='mt-1' /></span>
                        <Settings size={28} />
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div>
            <div className="md:hidden flex fixed top-0 z-10 w-full border-b h-14 bg-background text-foreground">
                <div className="p-4 w-full flex justify-between">
                    <AtSign size={28} />
                    <span className="text-xl flex gap-1">{name} <ChevronDown className='mt-1' /></span>
                    <Settings size={28} />
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
