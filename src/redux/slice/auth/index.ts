import { ApiPayloadData, User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
    loading: boolean
    error: string | null
    user: User | null
}

// Define the initial state using that type
const AuthState: AuthState = {
    loading: false,
    error: null,
    user: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: AuthState,
    reducers: {

    },
    extraReducers: (builder) => {},
})

export const {

} = AuthSlice.actions

export default AuthSlice.reducer