import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchPostLikesApi, fetchProfileFeedsApi, postFilesApi } from './api-functions'
import { AuthorData, FeedPost } from '@/types'

// Define a type for the slice state
export interface PostFeedState {
    feed: {
        Posts: FeedPost[]
        loading: boolean
        error: string | null
    },
    uploadFiles: {
        loading: boolean
        error: string | null
    },
    fetchLoading?: boolean
    fetchError?: string | null
}

// Define the initial state using that type
const PostFeedState: PostFeedState = {
    feed: {
        Posts: [],
        loading: false,
        error: null
    },
    uploadFiles: {
        loading: false,
        error: null
    },
    fetchLoading: false,
    fetchError: null
}

export const PostFeedSlice = createSlice({
    name: 'PostFeed',
    initialState: PostFeedState,
    reducers: {
        setFeedPosts: (state, action: PayloadAction<FeedPost[]>) => {
            state.feed.Posts = action.payload
        },
        setPostLikes: (state, action: PayloadAction<{ users: AuthorData[], postId: string }>) => {
            if (action.payload?.users && action.payload.postId) {
                const postIndex = state.feed.Posts.findIndex(post => post.id === action.payload.postId)
                state.feed.Posts[postIndex].likes = action.payload.users
                state.fetchLoading = false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(postFilesApi.pending, (state) => { })
            // .addCase(postFilesApi.fulfilled, (state, action: PayloadAction<any>) => { })
            // .addCase(postFilesApi.rejected, (state, action) => { })
            // .addCase(fetchProfileFeedsApi.pending, (state) => {
            //     state.fetchFeedsLoading = true
            //     state.fetchFeedsError = null
            // })
            // .addCase(fetchProfileFeedsApi.fulfilled, (state, action: PayloadAction<FeedPost[]>) => {
            //     state.fetchFeedsLoading = false
            //     state.feedPosts = action.payload
            // })
            // .addCase(fetchProfileFeedsApi.rejected, (state, action) => {
            //     state.fetchFeedsLoading = false
            //     state.fetchFeedsError = action.error.message || 'Failed to fetch feeds'
            // })
            .addCase(fetchPostLikesApi.pending, (state) => {
                state.fetchLoading = true
                state.fetchError = null
            })
            .addCase(fetchPostLikesApi.fulfilled, (state, action: PayloadAction<{ users: AuthorData[], postId: string }>) => {
                if (action.payload?.users && action.payload.postId) {
                    const postIndex = state.feed.Posts.findIndex(post => post.id === action.payload.postId)
                    state.feed.Posts[postIndex].likes = action.payload.users
                    state.fetchLoading = false
                }
            })
            .addCase(fetchPostLikesApi.rejected, (state, action) => {
                state.fetchLoading = false
                state.fetchError = action.error.message || 'Failed to fetch likes'
            })
    },
})

export const {
    setFeedPosts,
    setPostLikes
} = PostFeedSlice.actions

export default PostFeedSlice.reducer