import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FeedPost } from '@/types'
import { fetchAccountFeedApi } from '@/redux/services/account'
import { createPostLikeApi, destroyPostLikeApi, fetchOnePostApi } from '@/redux/services/post'

export type TypeActionLike = 'feeds' | 'singleFeed'
// Define a type for the slice state
export interface PostFeedState {
    state: FeedPost[]
    loading: boolean
    error: {
        message: string
        name?: string
        stack?: string
    } | null
    // 
    viewPost: FeedPost | null
    viewPostLoading: boolean
    viewPostError: string | null
    // like
    likeLoading?: boolean
}

// Define the initial state using that type
const PostFeedState: PostFeedState = {
    state: [],
    loading: false,
    error: null,

    viewPost: null,
    viewPostLoading: false,
    viewPostError: null,

    likeLoading: false,
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
                state.error = {
                    message: action.error.message || 'Failed to fetch posts',
                    name: action.error.name,
                    stack: action.error.stack
                }
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
            // post like
            .addCase(createPostLikeApi.pending, (state) => {
                state.likeLoading = true
            })
            .addCase(createPostLikeApi.fulfilled, (state, action: PayloadAction<{postId:string}>) => {
                const postIndex = state.state.findIndex((post) => post.id === action.payload.postId)
                if(postIndex !== -1){
                    state.state[postIndex].likeCount += 1
                    state.state[postIndex].is_Liked = true
                }
                if(state.viewPost?.id === action.payload.postId){
                    state.viewPost.likeCount += 1
                    state.viewPost.is_Liked = true
                }
                state.likeLoading = false
            })
            .addCase(createPostLikeApi.rejected, (state, action) => {
                state.likeLoading = false
            })
            // post like undo
            .addCase(destroyPostLikeApi.pending, (state) => {
                state.likeLoading = true
            })
            .addCase(destroyPostLikeApi.fulfilled, (state, action: PayloadAction<{postId:string}>) => {
                const postIndex = state.state.findIndex((post) => post.id === action.payload.postId)
                if(postIndex !== -1){
                    state.state[postIndex].likeCount -= 1
                    state.state[postIndex].is_Liked = false
                }
                if(state.viewPost?.id === action.payload.postId){
                    state.viewPost.likeCount -= 1
                    state.viewPost.is_Liked = false
                }
                state.likeLoading = false
            })
            .addCase(destroyPostLikeApi.rejected, (state, action) => {
                state.likeLoading = false
            })
    },
})

export const {

} = PostFeedSlice.actions

export default PostFeedSlice.reducer