/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const SplashScreen = () => {
    return (
        <div>
            <div className='h-screen'>
                <div className='justify-center items-center flex' style={{ "height": "90vh" }}>
                    <img className='w-60 h-60' src='/logo.png' />
                </div>
                <div className='flex justify-center items-end font-semibold text-gray-600'>BY SKY INC</div>
            </div>
        </div>
    )
}
export default SplashScreen;