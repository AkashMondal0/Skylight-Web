import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface SidebarState {
    notification: boolean
    hideNavigationBar: boolean,
    hideNavigationBarLabel: boolean,
}

// Define the initial state using that type
const SidebarState: SidebarState = {
    notification: false,
    hideNavigationBar: false,
    hideNavigationBarLabel: false,
}

export const SidebarSlice = createSlice({
    name: 'Sidebar',
    initialState: SidebarState,
    reducers: {
        toggleNotification: (state) => {
            state.notification = !state.notification
            state.hideNavigationBarLabel = state.notification
        },
        hideNavigationBar: (state) => {
            state.hideNavigationBar = true
        },
        showNavigationBar: (state) => {
            state.hideNavigationBar = false
        },
        hideNavigationBarLabel: (state) => {
            state.hideNavigationBarLabel = true
        },
        showNavigationBarLabel: (state) => {
            state.hideNavigationBarLabel = false
        },
        resetNavigationBar: (state) => {
            state.hideNavigationBar = false
            state.hideNavigationBarLabel = false
        }
    },
    extraReducers: (builder) => {

    },
})

export const {
    toggleNotification,
    hideNavigationBar,
    showNavigationBar,
    hideNavigationBarLabel,
    showNavigationBarLabel,
    resetNavigationBar
} = SidebarSlice.actions

export default SidebarSlice.reducer