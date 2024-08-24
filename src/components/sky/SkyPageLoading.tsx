'use client'
import React, { useEffect, useState } from "react"

const SkyPageLoading = () => {
    const [progress, setProgress] = useState(60)

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                setProgress(0);
            }, 1000);
        }
    }, []);

    return <>
        <div className={`justify-start w-full absolute top-0 left-0 h-1 
    transition-all duration-500 ease-in-out z-50 rounded-full flex items-center
     ${progress === 0 || progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="h-1 rounded-full transition-all duration-500 ease-in-out .rainbow-animation" style={{
                width: `${progress}%`,
            }} />
        </div>
    </>
}
export default SkyPageLoading