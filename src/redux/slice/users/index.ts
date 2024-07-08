import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchUserProfileData } from '@/redux/services/users'

// Define a type for the slice state
export interface UsersState {
    state: User | null,
    loading: boolean
    error: null | string,
}
export interface followAndunFollow {
    followingUserId: string,
    followerUserId: string,
    followingUsername?: string,
    followerUsername?: string,
    isProfile: boolean,
    type: 'followers' | 'following' | null
    userId?: User["id"]
}
// Define the initial state using that type
const UsersState: UsersState = {
    state: null,
    loading: false,
    error: null
}

export const UsersSlice = createSlice({
    name: 'Users',
    initialState: UsersState,
    reducers: {
        // setUsers: (state, action: PayloadAction<User>) => {
        //     state.profileData.user = action.payload
        // },
        // setFollowersUsers: (state, action: PayloadAction<{ Users: User[], skip: number, size: number }>) => {
        //     state.profileData.fetchFollow.followers = action.payload.Users
        //     state.profileData.fetchFollow.skip = action.payload.skip
        //     state.profileData.fetchFollow.size = action.payload.size
        // },
        // setFollowingsUsers: (state, action: PayloadAction<{ Users: User[], skip: number, size: number }>) => {
        //     state.profileData.fetchFollow.followings = action.payload.Users
        //     state.profileData.fetchFollow.skip = action.payload.skip
        //     state.profileData.fetchFollow.size = action.payload.size
        // },
        // removeUserFormSearch: (state, action: PayloadAction<User["id"]>) => {
        //     state.search_users = state.search_users.filter(item => item.id !== action.payload)
        // },
        // removeAllUserFormSearch: (state) => {
        //     state.search_users = []
        // },
        // followersDataClear: (state) => {
        //     state.profileData.fetchFollow = {
        //         ...state.profileData.fetchFollow,
        //         followers: [],
        //         size: 12,
        //         skip: 0,
        //     }
        // },
        // followingsDataClear: (state) => {
        //     state.profileData.fetchFollow = {
        //         ...state.profileData.fetchFollow,
        //         followings: [],
        //         size: 12,
        //         skip: 0,
        //     }
        // },
        // setLoadMoreProfilePosts: (state, action: PayloadAction<FeedPost[]>) => {
        //     if (!state.profileData.user) return
        //     // state.profileData.user.posts.push(...action.payload)
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfileData.pending, (state) => {
                state.loading = true
                state.error = null
                state.state = null
            })
            .addCase(fetchUserProfileData.fulfilled, (state, action: PayloadAction<User>) => {
                state.state = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchUserProfileData.rejected, (state, action) => {
                state.loading = false
                state.error = null
                state.state = null
            })
        // // FetchUserProfileDataApi
        // .addCase(FetchUserProfileDataApi.pending, (state) => {
        //     state.profileData.loading = true
        //     state.profileData.error = false
        //     state.profileData = {
        //         ...state.profileData,
        //         fetchFollow: {
        //             loading: false,
        //             error: false,
        //             skip: 0,
        //             size: 10,
        //             followers: [],
        //             followings: []
        //         },
        //         fetchPosts: {
        //             loading: false,
        //             error: false,
        //             posts: [],
        //             skip: 0,
        //             size: 10,
        //         }
        //     }

        // })
        // .addCase(FetchUserProfileDataApi.fulfilled, (state, action: PayloadAction<User>) => {
        //     state.profileData = {
        //         ...state.profileData,
        //         user: action.payload
        //     }
        //     state.profileData.loading = false
        //     state.profileData.error = false
        // })
        // .addCase(FetchUserProfileDataApi.rejected, (state, action) => {
        //     state.profileData.loading = false
        //     state.profileData.error = true
        //     state.profileData.user = null
        // })
        // // UserFollowingApi create
        // .addCase(UserFollowingApi.pending, (state) => {
        //     state.profileData.handleFollow.error = false
        //     state.profileData.handleFollow.loading = true
        // })
        // .addCase(UserFollowingApi.fulfilled, (state, action: PayloadAction<followAndunFollow>) => {
        //     state.profileData.handleFollow.loading = false
        //     state.profileData.handleFollow.error = false
        //     if (state.profileData.user) {
        //         if (action.payload.type === 'followers') {
        //             state.profileData.user.followingCount += 1
        //             const findUser = state.profileData.fetchFollow.followers.findIndex(item => item.id === action.payload.userId)
        //             if (findUser !== -1) {
        //                 state.profileData.fetchFollow.followers[findUser].isFollowing = true
        //             }
        //         }
        //         else if (action.payload.type === 'following') {
        //             state.profileData.user.followingCount += 1
        //             const findUser = state.profileData.fetchFollow.followings.findIndex(item => item.id === action.payload.userId)
        //             if (findUser !== -1) {
        //                 state.profileData.fetchFollow.followings[findUser].isFollowing = true
        //             }
        //         } else {
        //             state.profileData.user.followersCount += 1
        //             state.profileData.user.isFollowing = true
        //         }
        //     }
        // })
        // .addCase(UserFollowingApi.rejected, (state, action) => {
        //     state.profileData.handleFollow.loading = false
        //     state.profileData.handleFollow.error = true
        // })
        // // UserUnFollowingApi destroy
        // .addCase(UserUnFollowingApi.pending, (state) => {
        //     state.profileData.handleFollow.error = false
        //     state.profileData.handleFollow.loading = true
        // })
        // .addCase(UserUnFollowingApi.fulfilled, (state, action: PayloadAction<followAndunFollow>) => {
        //     state.profileData.handleFollow.loading = false
        //     state.profileData.handleFollow.error = false
        //     if (state.profileData.user) {
        //         if (action.payload.type === 'followers') {
        //             state.profileData.user.followersCount -= 1
        //             const findUser = state.profileData.fetchFollow.followers.findIndex(item => item.id === action.payload.userId)
        //             if (findUser !== -1) {
        //                 state.profileData.fetchFollow.followers[findUser].removeFollower = true
        //             }
        //         }
        //         else if (action.payload.type === 'following') {
        //             state.profileData.user.followingCount -= 1
        //             const findUser = state.profileData.fetchFollow.followings.findIndex(item => item.id === action.payload.userId)
        //             if (findUser !== -1) {
        //                 state.profileData.fetchFollow.followings[findUser].isFollowing = false
        //             }
        //         } else {
        //             state.profileData.user.followersCount -= 1
        //             state.profileData.user.isFollowing = false
        //         }

        //     }
        // })
        // .addCase(UserUnFollowingApi.rejected, (state, action) => {
        //     state.profileData.handleFollow.loading = false
        //     state.profileData.handleFollow.error = true
        // })
        // // FetchUserUnFollowingApi
        // .addCase(FetchFollowingsUserDataApi.pending, (state, action) => {
        //     state.profileData.fetchFollow.loading = true
        //     state.profileData.fetchFollow.error = false
        // })
        // .addCase(FetchFollowingsUserDataApi.fulfilled, (state, action: PayloadAction<User[]>) => {
        //     state.profileData.fetchFollow.followings = [...state.profileData.fetchFollow.followings, ...action.payload]
        //     state.profileData.fetchFollow.loading = false
        //     state.profileData.fetchFollow.error = false
        //     state.profileData.fetchFollow.skip += state.profileData.fetchFollow.size
        // })
        // .addCase(FetchFollowingsUserDataApi.rejected, (state, action) => {
        //     state.profileData.fetchFollow.loading = false
        //     state.profileData.fetchFollow.error = true
        // })
        // // FetchUserUnFollowingApi
        // .addCase(FetchFollowersUserDataApi.pending, (state) => {
        //     state.profileData.fetchFollow.loading = true
        //     state.profileData.fetchFollow.error = false
        // })
        // .addCase(FetchFollowersUserDataApi.fulfilled, (state, action: PayloadAction<User[]>) => {
        //     state.profileData.fetchFollow.followers = [...state.profileData.fetchFollow.followers, ...action.payload]
        //     state.profileData.fetchFollow.loading = false
        //     state.profileData.fetchFollow.error = false
        //     state.profileData.fetchFollow.skip += state.profileData.fetchFollow.size
        // })
        // .addCase(FetchFollowersUserDataApi.rejected, (state, action) => {
        //     state.profileData.fetchFollow.loading = false
        //     state.profileData.fetchFollow.error = true
        // })
    },
})

export const {
    // removeUserFormSearch,
    // removeAllUserFormSearch,
    // followersDataClear,
    // followingsDataClear,
    // setUsers,
    // setFollowersUsers,
    // setFollowingsUsers,
    // setLoadMoreProfilePosts
} = UsersSlice.actions

export default UsersSlice.reducer
