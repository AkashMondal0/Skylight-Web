import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {

}

// Define the initial state using that type
const AuthState: AuthState = {

}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: AuthState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    },
})

export const {

} = AuthSlice.actions

export default AuthSlice.reducer