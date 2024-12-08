/* eslint-disable @next/next/no-img-element */
import React, { memo } from 'react'
import { configs } from '@/configs';

export const SplashScreen = memo(function SplashScreen({ show }: { show: boolean }) {

    if (show) {
        return (
            <div className='absolute top-0 z-[60] bg-background w-full min-h-full'>
                <div className='items-center flex h-dvh flex-col justify-around'>
                    <div />
                    <div>
                        <img width={20}
                            height={20}
                            sizes="10vw"
                            className='w-32 h-32 mx-auto animate-pulse' src={configs.AppDetails.logoUrl}
                            alt='logo picture' />
                        <div className='flex justify-center items-end font-bold text-3xl font-sans'>
                            Snaapio
                        </div>
                    </div>
                    <p className='font-sans font-semibold'>By Skysolo</p>
                </div>
            </div>
        )
    }
    return <></>
}, ((pre: any, next: any) => pre.show === next.show))
export default SplashScreen;