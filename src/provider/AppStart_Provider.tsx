'use client'
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'


const AppStart_Provider = ({
    children
}: {
    children: React.ReactNode
}) => {
    


    return (
        <>
            {children}
        </>
    )
}

export default AppStart_Provider
