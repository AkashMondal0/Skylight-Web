import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface StoryState {

}

// Define the initial state using that type
const StoryState: StoryState = {

}

export const StorySlice = createSlice({
    name: 'Story',
    initialState: StoryState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    },
})

export const {

} = StorySlice.actions

export default StorySlice.reducer