import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchProfileFeedsApi, postFilesApi } from './api-functions'

export interface FeedPost {
    id: string
    caption: string
    fileUrl: string[]
    commentCount: number
    likeCount: number
    createdAt: Date
    alreadyLiked: boolean | null
    authorData: {
        id: string
        username: string
        email: string
        profilePicture: string
    }
}
// Define a type for the slice state
export interface PostFeedState {
    fetchFeedsLoading: boolean
    fetchFeedsError: string | null
    postFilesLoading: boolean
    postFilesError: string | null
    feedPosts: FeedPost[]
}

// Define the initial state using that type
const PostFeedState: PostFeedState = {
    fetchFeedsLoading: false,
    fetchFeedsError: null,
    postFilesLoading: false,
    postFilesError: null,
    feedPosts: [],
}

export const PostFeedSlice = createSlice({
    name: 'PostFeed',
    initialState: PostFeedState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(postFilesApi.pending, (state) => { })
            .addCase(postFilesApi.fulfilled, (state, action: PayloadAction<any>) => { })
            .addCase(postFilesApi.rejected, (state, action) => { })
            .addCase(fetchProfileFeedsApi.pending, (state) => {
                state.fetchFeedsLoading = true
                state.fetchFeedsError = null
            })
            .addCase(fetchProfileFeedsApi.fulfilled, (state, action: PayloadAction<FeedPost[]>) => {
                state.fetchFeedsLoading = false
                state.feedPosts = action.payload
            })
            .addCase(fetchProfileFeedsApi.rejected, (state, action) => {
                state.fetchFeedsLoading = false
                state.fetchFeedsError = action.error.message || 'Failed to fetch feeds'
            })
    },
})

export const {

} = PostFeedSlice.actions

export default PostFeedSlice.reducer