import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '@/redux/slice/profile'
import authReducer from '@/redux/slice/auth'
import usersReducer from '@/redux/slice/users'
import postFeedReducer from '@/redux/slice/post'
import modalReducer from '@/redux/slice/modal'
import conversationReducer from '@/redux/slice/conversation'
import accountReducer from '@/redux/slice/account'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    users: usersReducer,
    post: postFeedReducer,
    modal: modalReducer,
    conversation: conversationReducer,
    account: accountReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch