import { UploadImagesFireBaseApi } from '@/redux/services/account'
import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AccountState {
    UploadFiles: {
        loading: boolean,
        currentUploadImg: string | null,
        error: any
    }
}

// Define the initial state using that type
const AccountState: AccountState = {
    UploadFiles: {
        loading: false,
        currentUploadImg: null,
        error: null
    }
}

export const AccountSlice = createSlice({
    name: 'Account',
    initialState: AccountState,
    reducers: {
        ShowUploadImage: (state, action: PayloadAction<string>) => {
            state.UploadFiles.currentUploadImg = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(UploadImagesFireBaseApi.pending, (state) => {
                state.UploadFiles.loading = true
                state.UploadFiles.error = null
                state.UploadFiles.currentUploadImg = null
            })
            .addCase(UploadImagesFireBaseApi.fulfilled, (state) => {
                state.UploadFiles.loading = false
                state.UploadFiles.error = null
                state.UploadFiles.currentUploadImg = null
            })
            .addCase(UploadImagesFireBaseApi.rejected, (state, action) => {
                state.UploadFiles.loading = false
                state.UploadFiles.error = action.payload
            })
    },
})

export const {
    ShowUploadImage
} = AccountSlice.actions

export default AccountSlice.reducer