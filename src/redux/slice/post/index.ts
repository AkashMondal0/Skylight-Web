import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthorData, Post } from '@/types'
import { fetchAccountFeedApi } from '@/redux/services/account'
import { fetchOnePostApi, fetchPostLikesApi } from '@/redux/services/post'

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