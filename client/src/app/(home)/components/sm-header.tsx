import { CopyPlus, Heart } from 'lucide-react'
import React from 'react'

const Sm_Header = () => {
    return (
        <div className="md:hidden flex sticky top-0 z-10 border-b h-14">
            <div className="p-4 w-full flex justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">Skymedia</span>
                </div>
                <div className="flex items-center gap-4">
                    <CopyPlus size={28} />
                    <Heart size={28} />
                </div>
            </div>
        </div>
    )
}

export default Sm_Header
