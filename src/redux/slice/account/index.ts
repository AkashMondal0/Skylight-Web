import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AccountState {

}

// Define the initial state using that type
const AccountState: AccountState = {

}

export const AccountSlice = createSlice({
    name: 'Account',
    initialState: AccountState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    },
})

export const {

} = AccountSlice.actions

export default AccountSlice.reducer