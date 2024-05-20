import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchProfileDataApi, UploadImagesApi } from './api-functions'
import { User } from '@/types'

// Define a type for the slice state
interface ProfileState {
    user: User | null
    loading: boolean
    error: string | null
    AppStart: boolean
    UploadFiles: {
        loading: boolean
        error: string | null
        uploadImages: File[]
        currentUploadImg: File | null | any
    }
}

// Define the initial state using that type
const profileState: ProfileState = {
    user: null,
    loading: false,
    error: null,
    AppStart: false,
    UploadFiles: {
        loading: false,
        error: null,
        currentUploadImg: null,
        uploadImages: []
    }
}

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: profileState,
    reducers: {
        setShowUploadImage: (state, action: PayloadAction<File>) => {
            state.UploadFiles.currentUploadImg = action.payload
            // state.UploadFiles.uploadImages.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileDataApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProfileDataApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.loading = false
                state.error = null
                state.AppStart = true
            })
            .addCase(fetchProfileDataApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
                state.AppStart = true
            })
            // upload image
            .addCase(UploadImagesApi.pending, (state) => {
                state.UploadFiles.loading = true
                state.UploadFiles.error = null
                state.UploadFiles.currentUploadImg = null
                state.UploadFiles.uploadImages = []
            })
            .addCase(UploadImagesApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.UploadFiles.loading = false
                state.UploadFiles.error = null
            })
            .addCase(UploadImagesApi.rejected, (state, action) => {
                state.UploadFiles.loading = false
                state.UploadFiles.currentUploadImg = null
                state.UploadFiles.uploadImages = []
                state.UploadFiles.error = "Failed to upload images"
            })
    },
})

export const {
    setShowUploadImage
} = profileSlice.actions

export default profileSlice.reducer