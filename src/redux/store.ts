import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '@/redux/slice/profile'
import authReducer from '@/redux/slice/auth'
import usersReducer from '@/redux/slice/users'
import postFeedReducer from '@/redux/slice/post-feed'
import modalReducer from '@/redux/slice/modal'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    users: usersReducer,
    postFeed: postFeedReducer,
    modal: modalReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch