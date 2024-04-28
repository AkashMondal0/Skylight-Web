import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '@/redux/slice/profile'
import authReducer from '@/redux/slice/auth'
import usersReducer from '@/redux/slice/users'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch