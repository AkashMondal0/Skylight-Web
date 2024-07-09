import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FeedPost } from '@/types'
import { fetchAccountFeedApi } from '@/redux/services/account'
import { fetchOnePostApi } from '@/redux/services/post'

export type TypeActionLike = 'feeds' | 'singleFeed'
// Define a type for the slice state
export interface PostFeedState {
    state: FeedPost[]
    loading: boolean
    error: string | null
    // 
    viewPost?: FeedPost | null
    viewPostLoading?: boolean
    viewPostError?: string | null
}

// Define the initial state using that type
const PostFeedState: PostFeedState = {
    state: [],
    loading: false,
    error: null,

    viewPost: null,
    viewPostLoading: false,
    viewPostError: null
}

export const PostFeedSlice = createSlice({
    name: 'PostFeed',
    initialState: PostFeedState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountFeedApi.pending, (state) => {
                state.loading = true
                state.error = null
                state.state = []
            })
            .addCase(fetchAccountFeedApi.fulfilled, (state, action: PayloadAction<FeedPost[]>) => {
                if (action.payload?.length > 0) {
                    state.state.push(...action.payload)
                }
                state.loading = false
                state.error = null
            })
            .addCase(fetchAccountFeedApi.rejected, (state, action) => {
                state.loading = false
                state.state = []
                state.error = action.error.message || 'Failed to fetch profile feed'
            })
            // view post
            .addCase(fetchOnePostApi.pending, (state) => {
                state.viewPostLoading = true
                state.viewPostError = null
                state.viewPost = null
            })
            .addCase(fetchOnePostApi.fulfilled, (state, action: PayloadAction<FeedPost>) => {
                state.viewPost = action.payload
                state.viewPostLoading = false
                state.viewPostError = null
            })
            .addCase(fetchOnePostApi.rejected, (state, action) => {
                state.viewPostLoading = false
                state.viewPost = null
                state.viewPostError = action.error.message || 'Failed to fetch post'
            })
    },
})

export const {

} = PostFeedSlice.actions

export default PostFeedSlice.reducer