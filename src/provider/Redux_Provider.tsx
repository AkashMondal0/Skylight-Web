'use client'
import React from 'react'
import { store } from "@/redux/store";
import { Provider } from 'react-redux'
const Redux_Provider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Redux_Provider
