import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
        
    },
})

export const {

} = profileSlice.actions

export default profileSlice.reducer