import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface SidebarState {
    // sidebar
    notificationSidebar: boolean
    searchSidebar: boolean,
    hideNavigationBar: boolean,
    hideNavigationBarLabel: boolean,
    // modal
    uploadPostModal: boolean
}

// Define the initial state using that type
const SidebarState: SidebarState = {
    // sidebar
    notificationSidebar: false,
    searchSidebar: false,
    hideNavigationBar: false,
    hideNavigationBarLabel: false,
    // modal
    uploadPostModal: false
}

export const SidebarSlice = createSlice({
    name: 'Sidebar',
    initialState: SidebarState,
    reducers: {
        toggleNotificationSidebar: (state) => {
            if (state.searchSidebar) {
                state.searchSidebar = false
            }
            state.notificationSidebar = !state.notificationSidebar
            state.hideNavigationBarLabel = state.notificationSidebar
        },
        toggleSearchSidebar: (state) => {
            if (state.notificationSidebar) {
                state.notificationSidebar = false
            }
            state.searchSidebar = !state.searchSidebar
            state.hideNavigationBarLabel = state.searchSidebar
        },

        //
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
        },
        toggleCreatePostModal: (state) => {
            state.uploadPostModal = !state.uploadPostModal
        }
    },
    extraReducers: (builder) => {

    },
})

export const {
    toggleNotificationSidebar,
    toggleSearchSidebar,
    hideNavigationBar,
    showNavigationBar,
    hideNavigationBarLabel,
    showNavigationBarLabel,
    resetNavigationBar,
    toggleCreatePostModal
} = SidebarSlice.actions

export default SidebarSlice.reducer