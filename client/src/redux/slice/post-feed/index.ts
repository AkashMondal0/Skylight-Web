import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createPostLikeApi, destroyPostLikeApi, fetchPostLikesApi, fetchProfileFeedsApi, postFilesApi } from './api-functions'
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
    likeLoading?: boolean
    likeError?: string | null
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
    fetchError: null,
    likeLoading: false,
    likeError: null
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
            // 
            .addCase(createPostLikeApi.pending, (state) => {
                state.likeLoading = true
                state.likeError = null
            })
            .addCase(createPostLikeApi.fulfilled, (state, action: PayloadAction<{ user: AuthorData, postId: string }>) => {
                if (action.payload.postId) {
                    const postIndex = state.feed.Posts.findIndex(post => post.id === action.payload.postId)
                    if (state.feed.Posts[postIndex].likes) {
                        if (state.feed.Posts[postIndex].likes.findIndex(user => user.id === action.payload.user.id) === -1) {
                            state.feed.Posts[postIndex].likes = [...state.feed.Posts[postIndex].likes, action.payload.user]
                        }
                    } else {
                        state.feed.Posts[postIndex].likes = [action.payload.user]
                    }
                    state.feed.Posts[postIndex].alreadyLiked = true
                    state.feed.Posts[postIndex].likeCount += 1
                    state.likeLoading = false
                }
            })
            .addCase(createPostLikeApi.rejected, (state, action) => {
                state.likeLoading = false
                state.likeError = action.error.message || 'Failed to like post'
            })
            // 
            .addCase(destroyPostLikeApi.pending, (state) => {
                state.likeLoading = true
                state.likeError = null
            })
            .addCase(destroyPostLikeApi.fulfilled, (state, action: PayloadAction<{ user: AuthorData, postId: string }>) => {
                if (action.payload.postId) {
                    const postIndex = state.feed.Posts.findIndex(post => post.id === action.payload.postId)
                    if (state.feed.Posts[postIndex].likes && state.feed.Posts[postIndex].likes.findIndex(user => user.id === action.payload.user.id) !== -1) {
                        state.feed.Posts[postIndex].likes = state.feed.Posts[postIndex].likes.filter(like => like.id !== action.payload.user.id)
                    }
                    state.feed.Posts[postIndex].alreadyLiked = false
                    state.feed.Posts[postIndex].likeCount -= 1
                    state.likeLoading = false
                }
            })
            .addCase(destroyPostLikeApi.rejected, (state, action) => {
                state.likeLoading = false
                state.likeError = action.error.message || 'Failed to unlike post'
            })
    },
})

export const {
    setFeedPosts,
    setPostLikes
} = PostFeedSlice.actions

export default PostFeedSlice.reducer