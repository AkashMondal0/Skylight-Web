import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthorData, Comment, Post } from '@/types'
import { fetchAccountFeedApi } from '@/redux/services/account'
import { createPostCommentApi, createPostLikeApi, destroyPostLikeApi, fetchOnePostApi, fetchPostLikesApi } from '@/redux/services/post'

export type TypeActionLike = 'feeds' | 'singleFeed'
// Define a type for the slice state
export interface PostState {
    feeds: Post[]
    feedsLoading: boolean
    feedsError: {
        message: string
        name?: string
        stack?: string
    } | null
    // 
    viewPost: Post | null
    viewPostLoading: boolean
    viewPostError: string | null
    // like
    likeLoading?: boolean
    likesUserList: AuthorData[]
    // comment
    commentLoading: boolean
}

// Define the initial state using that type
const PostState: PostState = {
    feeds: [],
    feedsLoading: false,
    feedsError: null,

    viewPost: null,
    viewPostLoading: false,
    viewPostError: null,

    likeLoading: false,
    likesUserList: [],

    commentLoading: false
}

export const PostsSlice = createSlice({
    name: 'PostFeed',
    initialState: PostState,
    reducers: {
        setMoreData:(state, action: PayloadAction<Post[]>)=>{
            if (action.payload?.length > 0) {
                state.feeds.push(...action.payload)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountFeedApi.pending, (state) => {
                state.feedsLoading = true
                state.feedsError = null
            })
            .addCase(fetchAccountFeedApi.fulfilled, (state, action: PayloadAction<Post[]>) => {
                // if (action.payload?.length > 0) {
                //     state.feeds.push(...action.payload)
                // }
                state.feedsLoading = false
            })
            .addCase(fetchAccountFeedApi.rejected, (state, action) => {
                state.feedsLoading = false
                state.feedsError = {
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
            .addCase(fetchOnePostApi.fulfilled, (state, action: PayloadAction<Post>) => {
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
            .addCase(createPostLikeApi.fulfilled, (state, action: PayloadAction<{ postId: string }>) => {
                const postIndex = state.feeds.findIndex((post) => post.id === action.payload.postId)
                if (postIndex !== -1) {
                    state.feeds[postIndex].likeCount += 1
                    state.feeds[postIndex].is_Liked = true
                }
                if (state.viewPost?.id === action.payload.postId) {
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
            .addCase(destroyPostLikeApi.fulfilled, (state, action: PayloadAction<{ postId: string }>) => {
                const postIndex = state.feeds.findIndex((post) => post.id === action.payload.postId)
                if (postIndex !== -1) {
                    state.feeds[postIndex].likeCount -= 1
                    state.feeds[postIndex].is_Liked = false
                }
                if (state.viewPost?.id === action.payload.postId) {
                    state.viewPost.likeCount -= 1
                    state.viewPost.is_Liked = false
                }
                state.likeLoading = false
            })
            .addCase(destroyPostLikeApi.rejected, (state, action) => {
                state.likeLoading = false
            })
            // post comment create
            .addCase(createPostCommentApi.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(createPostCommentApi.fulfilled, (state, action: PayloadAction<Comment>) => {
                if (state.viewPost?.id === action.payload.postId) {
                    state.viewPost?.comments.unshift(action.payload)
                    const index = state.feeds.findIndex((post) => post.id === action.payload.postId)
                    if (index !== -1) {
                        state.feeds[index].commentCount += 1
                    }
                }
                state.commentLoading = false
            })
            .addCase(createPostCommentApi.rejected, (state, action) => {
                state.commentLoading = false
            })
            // fetchPostLikesApi
            .addCase(fetchPostLikesApi.pending, (state) => {
                state.likeLoading = true
                state.likesUserList = []
            })
            .addCase(fetchPostLikesApi.fulfilled, (state, action: PayloadAction<AuthorData[]>) => {
                state.likesUserList = [...action.payload]
                state.likeLoading = false
            })
            .addCase(fetchPostLikesApi.rejected, (state, action) => {
                state.likeLoading = false
                state.likesUserList = []
            })
    },
})

export const {
    setMoreData
} = PostsSlice.actions

export default PostsSlice.reducer