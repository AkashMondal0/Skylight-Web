import { RootState } from '@/redux/store'
import { Post, User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FetchFollowersUserDataApi, FetchFollowingsUserDataApi, FetchUserProfileDataApi, searchProfileApi, UserFollowingApi, UserUnFollowingApi } from './api-functions'

// Define a type for the slice state
interface UsersState {
    search_users: User[]
    loading?: boolean
    error?: string | null
    userProfileData: User | null
    profileLoading: boolean
    profileError: boolean
    followLoading?: boolean
    followError?: boolean
    followersUserData: User[]
    followingsUserData: User[]
    fetchFollowLoading: boolean
    fetchFollowError: boolean
}

// Define the initial state using that type
const UsersState: UsersState = {
    // 
    search_users: [],
    loading: false,
    error: null,
    //
    userProfileData: null,
    profileLoading: false,
    profileError: false,
    //
    followLoading: false,
    followError: false,
    //
    followersUserData: [],
    followingsUserData: [],
    fetchFollowLoading: false,
    fetchFollowError: false
}

export const UsersSlice = createSlice({
    name: 'Users',
    initialState: UsersState,
    reducers: {
        removeUserFormSearch: (state, action: PayloadAction<User["id"]>) => {
            state.search_users = state.search_users.filter(item => item.id !== action.payload)
        },
        removeAllUserFormSearch: (state) => {
            state.search_users = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProfileApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(searchProfileApi.fulfilled, (state, action: PayloadAction<User[]>) => {
                // remove duplicates object from array
                state.search_users = Array.from(new Map(state.search_users.concat(action.payload).map(item => [item.id, item])).values())
                // search users in local array by name or email
                state.loading = false
                state.error = null
            })
            .addCase(searchProfileApi.rejected, (state, action) => {
                state.loading = false
                state.error = null
            })
            // FetchUserProfileDataApi
            .addCase(FetchUserProfileDataApi.pending, (state) => {
                state.profileLoading = true
                state.profileError = false
                state.userProfileData = null
            })
            .addCase(FetchUserProfileDataApi.fulfilled, (state, action: PayloadAction<UsersState["userProfileData"]>) => {
                state.userProfileData = action.payload
                state.profileLoading = false
                state.profileError = false
                // clear followers and followings data
                state.followersUserData = []
                state.followingsUserData = []
            })
            .addCase(FetchUserProfileDataApi.rejected, (state, action) => {
                state.profileError = true
                state.profileLoading = false
                state.userProfileData = null
            })
            // UserFollowingApi
            .addCase(UserFollowingApi.pending, (state) => {
                state.followLoading = true
                state.followError = false
            })
            .addCase(UserFollowingApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.followLoading = false
                state.followError = false
                if (state.userProfileData && state.userProfileData.isFollowing === false) {
                    state.userProfileData.isFollowing = true
                }
            })
            .addCase(UserFollowingApi.rejected, (state, action) => {
                state.followLoading = false
                state.followError = true
            })
            // UserUnFollowingApi
            .addCase(UserUnFollowingApi.pending, (state) => {
                state.followLoading = true
                state.followError = false
            })
            .addCase(UserUnFollowingApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.followLoading = false
                state.followError = false
                if (state.userProfileData && state.userProfileData.isFollowing === true) {
                    state.userProfileData.isFollowing = false
                }
            })
            .addCase(UserUnFollowingApi.rejected, (state, action) => {
                state.followLoading = false
                state.followError = true
            })
            // FetchUserUnFollowingApi
            .addCase(FetchFollowingsUserDataApi.pending, (state) => {
                state.fetchFollowLoading = true
                state.fetchFollowError = false
            })
            .addCase(FetchFollowingsUserDataApi.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.followingsUserData = [...state.followingsUserData, ...action.payload]
            })
            .addCase(FetchFollowingsUserDataApi.rejected, (state, action) => {
                state.fetchFollowLoading = false
                state.fetchFollowError = true
            })
            // FetchUserUnFollowingApi
            .addCase(FetchFollowersUserDataApi.pending, (state) => {
                state.fetchFollowLoading = true
                state.fetchFollowError = false
            })
            .addCase(FetchFollowersUserDataApi.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.followersUserData = [...state.followersUserData, ...action.payload]
            })
            .addCase(FetchFollowersUserDataApi.rejected, (state, action) => {
                state.fetchFollowLoading = false
                state.fetchFollowError = true
            })
    },
})

export const {
    removeUserFormSearch,
    removeAllUserFormSearch
} = UsersSlice.actions

export default UsersSlice.reducer
