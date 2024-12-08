import { configureStore } from '@reduxjs/toolkit'
import AccountReducer from './slice/account'
import ConversationReducer from './slice/conversation'
import PostReducer from './slice/post'
import ProfileReducer from './slice/profile'
import UsersReducer from './slice/users'
import NotificationReducer from './slice/notification'
import DialogsReducer from './slice/dialog'
import SidebarReducer from './slice/sidebar'

export const store = configureStore({
  reducer: {
    AccountState: AccountReducer,
    ConversationState: ConversationReducer,
    PostState: PostReducer,
    ProfileState: ProfileReducer,
    UsersState: UsersReducer,
    NotificationState: NotificationReducer,
    DialogsState: DialogsReducer,
    SidebarState: SidebarReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch