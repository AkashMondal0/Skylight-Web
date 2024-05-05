/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import SplashScreen from '@/components/sky/SplashScreen'
import { fetchProfileFeedsApi } from '@/redux/slice/post-feed/api-functions'
import { fetchProfileDataApi } from '@/redux/slice/profile/api-functions'
import { RootState } from '@/redux/store'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const AppStart_context = React.createContext({})


const AppStart_Provider = ({
    children
}: {
    children: React.ReactNode
}) => {
    // const dispatch = useDispatch()
    // const profile = useSelector((state: RootState) => state.profile)
    // const loadedRef = useRef(false)

    // useEffect(() => {
    //     if (!loadedRef.current) {
    //         const StartApp = async () => {
    //             await dispatch(fetchProfileDataApi() as any)
    //             await dispatch(fetchProfileFeedsApi() as any)
    //         }
    //         StartApp()
    //         loadedRef.current = true;
    //     }
    // }, []);

    // if (!profile.AppStart) {
    //     return <SplashScreen />
    // }


    return (
        <AppStart_context.Provider value={{}}>
            {children}
        </AppStart_context.Provider>
    )
}

export default AppStart_Provider
