'use client'
import SplashScreen from '@/components/sky/SplashScreen'
import { fetchProfileDataApi } from '@/redux/slice/profile/api-functions'
import { RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const AppStart_context = React.createContext({})


const AppStart_Provider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const dispatch = useDispatch()
    const profile = useSelector((state: RootState) => state.profile)
    const StartApp = async () => { await dispatch(fetchProfileDataApi() as any) }

    useEffect(() => {
        StartApp()
    }, [])

    if (!profile.AppStart) {
        return <SplashScreen/>
    }


    return (
        <AppStart_context.Provider value={{

        }}>
            {children}
        </AppStart_context.Provider>
    )
}

export default AppStart_Provider
