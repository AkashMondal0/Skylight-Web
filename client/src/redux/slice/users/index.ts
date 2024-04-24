import { RootState } from '@/redux/store'
import { Post, User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FetchUserProfileDataApi, searchProfileApi } from './api-functions'

// Define a type for the slice state
interface UsersState {
    search_users: User[]
    loading?: boolean
    error?: string | null
    userProfileData:User | null
    profileLoading: boolean
    profileError: string | null
}

// Define the initial state using that type
const UsersState: UsersState = {
    search_users: [],
    loading: false,
    error: null,
    userProfileData: null,
    profileLoading: false,
    profileError: null,
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
                state.error = action.error.message || null
            })
            .addCase(FetchUserProfileDataApi.pending, (state) => {
                state.profileLoading = true
            })
            .addCase(FetchUserProfileDataApi.fulfilled, (state, action: PayloadAction<UsersState["userProfileData"]>) => {
                state.userProfileData = action.payload
                state.profileLoading = false
                state.profileError = null
            })
            .addCase(FetchUserProfileDataApi.rejected, (state, action) => {
                state.error = action.error.message || null
            })
    },
})

export const {
    removeUserFormSearch,
    removeAllUserFormSearch
} = UsersSlice.actions

export default UsersSlice.reducer
