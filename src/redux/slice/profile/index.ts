import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types'
import { createFriendshipApi, destroyFriendshipApi, fetchUserProfileDetailApi } from '@/redux/services/profile'

// Define a type for the slice state
interface ProfileState {
    state: User | null
    loading: boolean
    error: string | null

    friendShipLoading: boolean
    friendShipError: string | null
}

// Define the initial state using that type
const profileState: ProfileState = {
    state: null,
    loading: false,
    error: null,

    friendShipLoading: false,
    friendShipError: null,
}

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: profileState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfileDetailApi.pending, (state) => {
                state.loading = true
                state.error = null
                state.state = null
            })
            .addCase(fetchUserProfileDetailApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.state = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchUserProfileDetailApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
                state.state = null
            })
            //  createFriendshipApi
            .addCase(createFriendshipApi.pending, (state) => {
                state.friendShipLoading = true
                state.friendShipError = null
            })
            .addCase(createFriendshipApi.fulfilled, (state) => {
                if (state.state) {
                    state.state.friendship = {
                        ...state.state.friendship,
                        following: true,
                    }
                }
                state.friendShipLoading = false
            })
            .addCase(createFriendshipApi.rejected, (state, action) => {
               state.friendShipLoading = false
                state.friendShipError = action.error.message || null
            })
            // destroyFriendshipApi
            .addCase(destroyFriendshipApi.pending, (state) => {
                state.friendShipLoading = true
                state.friendShipError = null
            })
            .addCase(destroyFriendshipApi.fulfilled, (state) => {
                if (state.state) {
                    state.state.friendship = {
                        ...state.state.friendship,
                        following: false,
                    }
                }
                state.friendShipLoading = false
            })
            .addCase(destroyFriendshipApi.rejected, (state, action) => {
                state.friendShipLoading = false
                state.friendShipError = action.error.message || null
            })
    },
})

export const {
    // increment,
    // decrement,
    // incrementByAmount,
} = profileSlice.actions

export default profileSlice.reducer