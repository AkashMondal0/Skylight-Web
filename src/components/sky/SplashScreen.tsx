import React from 'react'
import OptimizedImage from './SkyImage';

export const SplashScreen = () => {
    return (
        <div>
            <div className='h-screen'>
                <div className='justify-center items-center flex'
                    style={{ "height": "90vh" }}>
                    <OptimizedImage width={20}
                        height={20}
                        sizes="10vw"
                        className='w-60 h-60' src='/logo.png'
                        alt='logo picture' />
                </div>
                <div className='flex justify-center items-end'>BY SKY INC</div>
            </div>
        </div>
    )
}
export default SplashScreen;