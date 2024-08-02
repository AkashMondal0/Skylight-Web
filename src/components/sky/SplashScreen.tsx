import React from 'react'
import OptimizedImage from './SkyImage';

export const SplashScreen = () => {
    return (
        <>
            <div className='justify-center items-center flex h-dvh flex-col'>
                <OptimizedImage width={20}
                    height={20}
                    sizes="10vw"
                    className='w-60 h-60 mx-auto' src='/skylight_logo.png'
                    alt='logo picture' />
            <div className='flex justify-center items-end font-bold text-3xl font-sans'>SkyLight</div>

            </div>
        </>
    )
}
export default SplashScreen;