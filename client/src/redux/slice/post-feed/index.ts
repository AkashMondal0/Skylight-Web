import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface PostFeedState {

}

// Define the initial state using that type
const PostFeedState: PostFeedState = {

}

export const PostFeedSlice = createSlice({
    name: 'PostFeed',
    initialState: PostFeedState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    },
})

export const {

} = PostFeedSlice.actions

export default PostFeedSlice.reducer