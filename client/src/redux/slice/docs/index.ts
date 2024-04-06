import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface DocsState {

}

// Define the initial state using that type
const DocsState: DocsState = {

}

export const DocsSlice = createSlice({
    name: 'Docs',
    initialState: DocsState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    },
})

export const {

} = DocsSlice.actions

export default DocsSlice.reducer