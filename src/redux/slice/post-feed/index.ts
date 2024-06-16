import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createPostCommentApi, createPostLikeApi, destroyPostCommentApi, destroyPostLikeApi, fetchPostLikesApi } from './api-functions'
import { AuthorData, FeedPost, Comment } from '@/types'
import { fetchProfileFeedApi } from '../profile/api-functions'

export type TypeActionLike = 'feeds' | 'singleFeed'
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
    singlePost: FeedPost | null
    commentLoading?: boolean
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
    likeError: null,
    singlePost: null,
    commentLoading: false
}

export const PostFeedSlice = createSlice({
    name: 'PostFeed',
    initialState: PostFeedState,
    reducers: {
        setFeedPosts: (state, action: PayloadAction<FeedPost[]>) => {
            state.feed.Posts = action.payload
        },
        loadMoreData: (state, action: PayloadAction<FeedPost[]>) => {
            state.feed.Posts = [...state.feed.Posts, ...action.payload]
        },
        setPostLikes: (state, action: PayloadAction<{ users: AuthorData[], postId: string }>) => {
            if (action.payload?.users && action.payload.postId) {
                const postIndex = state.feed.Posts.findIndex(post => post.id === action.payload.postId)
                state.feed.Posts[postIndex].likes = action.payload.users
                state.fetchLoading = false
            }
        },
        setSinglePost: (state, action: PayloadAction<FeedPost>) => {
            state.singlePost = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileFeedApi.pending, (state) => {
                state.fetchLoading = true
                state.fetchError = null
            })
            .addCase(fetchProfileFeedApi.fulfilled, (state, action:  PayloadAction<FeedPost[]>) => {
                state.feed.Posts = action.payload
                state.fetchLoading = false
            })
            .addCase(fetchProfileFeedApi.rejected, (state, action) => {
                state.fetchLoading = false
                state.fetchError = action.error.message || 'Failed to fetch likes'
            })
            // fetch post likes
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
            // like
            .addCase(createPostLikeApi.pending, (state) => {
                state.likeLoading = true
                state.likeError = null
            })
            .addCase(createPostLikeApi.fulfilled, (state, action: PayloadAction<{ user: AuthorData, postId: string, type: TypeActionLike }>) => {

                // feeds 
                if (action.payload.postId && state.feed.Posts.length > 0) {
                    const postIndex = state.feed.Posts.findIndex(post => post.id === action.payload.postId)
                    if (state.feed.Posts[postIndex]?.likes && state.feed.Posts[postIndex]?.likes.findIndex(user => user.id === action.payload.user.id) === -1) {
                        state.feed.Posts[postIndex].likes.push(action.payload.user)
                    }
                    state.feed.Posts[postIndex].alreadyLiked = true
                    state.feed.Posts[postIndex].likeCount += 1
                    state.likeLoading = false
                }
                if (state.singlePost?.id === action.payload.postId) {
                    state.singlePost.alreadyLiked = true
                    state.singlePost.likeCount += 1
                    state.likeLoading = false
                }
            })
            .addCase(createPostLikeApi.rejected, (state, action) => {
                state.likeLoading = false
                state.likeError = action.error.message || 'Failed to like post'
            })
            // unlike
            .addCase(destroyPostLikeApi.pending, (state) => {
                state.likeLoading = true
                state.likeError = null
            })
            .addCase(destroyPostLikeApi.fulfilled, (state, action: PayloadAction<{ user: AuthorData, postId: string, type: TypeActionLike }>) => {

                if (action.payload.postId && state.feed.Posts.length > 0) {
                    const postIndex = state.feed.Posts.findIndex(post => post.id === action.payload.postId)
                    if (state.feed.Posts[postIndex]?.likes && state.feed.Posts[postIndex]?.likes.findIndex(user => user.id === action.payload.user.id) !== -1) {
                        state.feed.Posts[postIndex].likes = state.feed.Posts[postIndex].likes.filter(like => like.id !== action.payload.user.id)
                    }
                    state.feed.Posts[postIndex].alreadyLiked = false
                    state.feed.Posts[postIndex].likeCount -= 1
                    state.likeLoading = false
                }
                if (state.singlePost?.id === action.payload.postId) {
                    state.singlePost.alreadyLiked = false
                    state.singlePost.likeCount -= 1
                    state.likeLoading = false
                }

            })
            .addCase(destroyPostLikeApi.rejected, (state, action) => {
                state.likeLoading = false
                state.likeError = action.error.message || 'Failed to unlike post'
            })
            // create comment
            .addCase(createPostCommentApi.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(createPostCommentApi.fulfilled, (state, action: PayloadAction<{ postId: string, comment: Comment, type: TypeActionLike }>) => {
                if (action.payload.type === "singleFeed" && state.singlePost?.id === action.payload.postId && state.singlePost && state.singlePost.comments) {
                    state.singlePost.comments = [action.payload.comment, ...state.singlePost.comments]
                    state.singlePost.commentCount += 1
                    state.commentLoading = false
                }
            })
            .addCase(createPostCommentApi.rejected, (state, action) => {
                state.commentLoading = false
            })
            // destroy comment
            .addCase(destroyPostCommentApi.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(destroyPostCommentApi.fulfilled, (state, action: PayloadAction<{ postId: string, comment: Comment, type: TypeActionLike }>) => {
                if (action.payload.type === "singleFeed" && state.singlePost?.id === action.payload.postId && state.singlePost && state.singlePost.comments) {
                    state.singlePost.commentCount += 1
                    state.commentLoading = false
                }
            })
            .addCase(destroyPostCommentApi.rejected, (state, action) => {
                state.commentLoading = false
            })

    },
})

export const {
    setFeedPosts,
    setPostLikes,
    setSinglePost,
    loadMoreData
} = PostFeedSlice.actions

export default PostFeedSlice.reducer