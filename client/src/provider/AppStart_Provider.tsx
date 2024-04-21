'use client'
import { fetchProfileDataApi } from '@/redux/slice/profile/api-functions'
import React from 'react'
import { useDispatch } from 'react-redux'
const AppStart_context = React.createContext({})


const AppStart_Provider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const dispatch = useDispatch()
    const StartApp = async () => {
        // await dispatch(fetchProfileDataApi())
    }


    return (
        <AppStart_context.Provider value={{

        }}>
            {children}
        </AppStart_context.Provider>
    )
}

export default AppStart_Provider
