import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthorData, loadingType, Post, Session, Story } from '@/types'
import {
  fetchAccountAllStroyApi, fetchAccountFeedApi,
  fetchAccountStoryApi, fetchAccountStoryTimelineApi,
  getSessionApi,
  uploadFilesApi,
  uploadStoryApi
} from './api.service'
import { isArray } from 'lodash'


export type AccountState = {
  session: Session | null
  sessionLoading: loadingType
  sessionError: string | null
  //
  accountStories: Story[]
  accountStoriesLoading: loadingType
  accountStoriesError: string | null
  accountStoriesFetched: boolean
  //
  uploadFile: string | null
  uploadFilesLoading: boolean
  uploadFilesError: string | null
  // 
  uploadStoryLoading: boolean
  uploadStoryError: string | null
  //
  feeds: Post[]
  feedsLoading: loadingType
  feedsError: string | null
  feedsFetched: boolean
  // 
  storyAvatars: AuthorData[]
  storyAvatarsLoading: loadingType
  storyAvatarsError: string | null
  storyAvatarsFetched: boolean
  // 
  stories: Story[]
  storiesLoading: loadingType
  storiesError: string | null
  storiesFetched: boolean
}


const initialState: AccountState = {
  session: null,
  sessionLoading: "idle",
  sessionError: null,
  // 
  uploadFile: null,
  uploadFilesLoading: false,
  uploadFilesError: null,
  //
  uploadStoryLoading: false,
  uploadStoryError: null,
  //
  feeds: [],
  feedsLoading: "idle",
  feedsError: null,
  feedsFetched: false,
  // 
  storyAvatars: [],
  storyAvatarsLoading: "idle",
  storyAvatarsError: null,
  storyAvatarsFetched: false,
  //
  stories: [],
  storiesLoading: "idle",
  storiesError: null,
  storiesFetched: false,

  //
  accountStories: [],
  accountStoriesLoading: "idle",
  accountStoriesError: null,
  accountStoriesFetched: false,
  //
}

export const AccountSlice = createSlice({
  name: 'Account',
  initialState,
  reducers: {
    resetAccountState: (state) => {
      state.feeds = []
    },
    resetFeeds: (state) => {
      state.feeds = []
      state.feedsLoading = "idle"
      state.feedsError = null
      // 
      state.storyAvatars = []
      state.storyAvatarsLoading = "idle"
      state.storyAvatarsError = null

    },

    currentUploadingFile: (state, action: PayloadAction<string | null>) => {
      state.uploadFile = action.payload
    },
    resetStories: (state) => {
      state.stories = []
    }
  },
  extraReducers: (builder) => {
    builder
      // getSessionApi
      .addCase(getSessionApi.pending, (state) => {
        state.sessionLoading = "pending"
        state.sessionError = null
      })
      .addCase(getSessionApi.fulfilled, (state, action: PayloadAction<Session>) => {
        state.session = action.payload
        state.sessionLoading = "normal"
      })
      .addCase(getSessionApi.rejected, (state, action: PayloadAction<any>) => {
        state.sessionLoading = "normal"
        state.sessionError = action.payload?.message ?? "fetch error"
      })
      // fetchAccountFeedApi
      .addCase(fetchAccountFeedApi.pending, (state) => {
        state.feedsLoading = "pending"
        state.feedsError = null
      })
      .addCase(fetchAccountFeedApi.fulfilled, (state, action: PayloadAction<Post[]>) => {
        if (isArray(action.payload)) {
          state.feeds.push(...action.payload)
          if (action.payload.length <= 0) {
            state.feedsFetched = true
          }
        }
        state.feedsLoading = "normal"
      })
      .addCase(fetchAccountFeedApi.rejected, (state, action: PayloadAction<any>) => {
        state.feedsLoading = "normal"
        state.feedsError = action.payload?.message ?? "fetch error"
      })
      // uploadFilesApi
      .addCase(uploadFilesApi.pending, (state) => {
        state.uploadFilesLoading = true
        state.uploadFilesError = null
      })
      .addCase(uploadFilesApi.fulfilled, (state) => {
        state.uploadFilesLoading = false
      })
      .addCase(uploadFilesApi.rejected, (state, action: any) => {
        state.uploadFilesError = action.payload?.message ?? "upload error"
        state.uploadFilesLoading = false
      })
      // uploadStoryApi
      .addCase(uploadStoryApi.pending, (state) => {
        state.uploadStoryLoading = true
        state.uploadStoryError = null
      })
      .addCase(uploadStoryApi.fulfilled, (state) => {
        state.uploadStoryLoading = false
      })
      .addCase(uploadStoryApi.rejected, (state, action: any) => {
        state.uploadStoryError = action.payload?.message ?? "upload error"
        state.uploadStoryLoading = false
      })
      // fetchAccountStoryTimelineApi
      .addCase(fetchAccountStoryTimelineApi.pending, (state) => {
        state.storyAvatarsLoading = "pending"
        state.storyAvatarsError = null
      })
      .addCase(fetchAccountStoryTimelineApi.fulfilled, (state, action: PayloadAction<AuthorData[]>) => {
        if (isArray(action.payload)) {
          state.storyAvatars.push(...action.payload)
          if (action.payload.length <= 0) {
            state.storyAvatarsFetched = true
          }
        }
        state.storyAvatarsLoading = "normal"
      })
      .addCase(fetchAccountStoryTimelineApi.rejected, (state, action: PayloadAction<any>) => {
        state.storyAvatarsLoading = "normal"
        state.storyAvatarsError = action.payload?.message ?? "fetch error"
      })
      // fetchAccountAllStroyApi
      .addCase(fetchAccountAllStroyApi.pending, (state) => {
        state.storiesLoading = "pending"
        state.storiesError = null
      })
      .addCase(fetchAccountAllStroyApi.fulfilled, (state, action: PayloadAction<Story[]>) => {
        if (action.payload?.length > 0) {
          state.stories.push(...action.payload)
        }
        state.storiesLoading = "normal"
      })
      .addCase(fetchAccountAllStroyApi.rejected, (state, action: PayloadAction<any>) => {
        state.storiesLoading = "normal"
        state.storiesError = action.payload?.message ?? "fetch error"
      })
      // fetchAccountStoryApi
      .addCase(fetchAccountStoryApi.pending, (state) => {
        state.accountStoriesLoading = "pending"
        state.accountStoriesError = null
      })
      .addCase(fetchAccountStoryApi.fulfilled, (state, action: PayloadAction<Story[]>) => {
        state.accountStories = action.payload
        state.accountStoriesLoading = "normal"
      })
      .addCase(fetchAccountStoryApi.rejected, (state, action: PayloadAction<any>) => {
        state.accountStoriesLoading = "normal"
        state.accountStoriesError = action.payload?.message ?? "fetch error"
      })
  },
})

export const {
  resetAccountState,
  resetFeeds,
  currentUploadingFile,
  resetStories
} = AccountSlice.actions

export default AccountSlice.reducer