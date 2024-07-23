import React from 'react'

export const SplashScreen = () => {
    return (
        <div>
            <div className='h-screen'>
                <div className='justify-center items-center flex' 
                style={{ "height": "90vh" }}>
                    <img className='w-60 h-60' src='/logo.png' />
                </div>
                <div className='flex justify-center items-end'>BY SKY INC</div>
            </div>
        </div>
    )
}
export default SplashScreen;