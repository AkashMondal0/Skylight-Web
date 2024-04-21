import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UsersState {

}

// Define the initial state using that type
const UsersState: UsersState = {

}

export const UsersSlice = createSlice({
    name: 'Users',
    initialState: UsersState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    },
})

export const {

} = UsersSlice.actions

export default UsersSlice.reducer