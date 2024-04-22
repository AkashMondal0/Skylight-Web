import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchProfileDataApi } from './api-functions'
import { User } from '@/types'

// Define a type for the slice state
interface ProfileState {
    profileData: User | null
    loading: boolean
    error: string | null
}

// Define the initial state using that type
const profileState: ProfileState = {
    profileData: null,
    loading: false,
    error: null
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
                state.profileData = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchProfileDataApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
            })
    },
})

export const {

} = profileSlice.actions

export default profileSlice.reducer