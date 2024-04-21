import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchProfileDataApi } from './api-functions'

// Define a type for the slice state
interface ProfileState {

}

// Define the initial state using that type
const profileState: ProfileState = {

}

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: profileState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileDataApi.pending, (state) => {

            })
            .addCase(fetchProfileDataApi.fulfilled, (state, action: PayloadAction<any>) => {

            })
            .addCase(fetchProfileDataApi.rejected, (state, action) => {

            })
    },
})

export const {

} = profileSlice.actions

export default profileSlice.reducer