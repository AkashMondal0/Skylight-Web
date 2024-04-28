import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FetchMyProfileDataApi, fetchProfileDataApi } from './api-functions'
import { User } from '@/types'

// Define a type for the slice state
interface ProfileState {
    user: User | null
    loading: boolean
    error: string | null
    AppStart: boolean
}

// Define the initial state using that type
const profileState: ProfileState = {
    user: null,
    loading: false,
    error: null,
    AppStart: false
}

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: profileState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileDataApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProfileDataApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.loading = false
                state.error = null
                state.AppStart = true
            })
            .addCase(fetchProfileDataApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
                state.AppStart = true
            })
            .addCase(FetchMyProfileDataApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(FetchMyProfileDataApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.loading = false
                state.error = null
                state.AppStart = true
            })
            .addCase(FetchMyProfileDataApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
                state.AppStart = true
            })
    },
})

export const {

} = profileSlice.actions

export default profileSlice.reducer