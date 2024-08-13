import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Notification } from '@/types'
import { fetchAccountNotificationApi, fetchUnreadNotificationCountApi } from '@/redux/services/notification'

// Define a type for the slice state
type NotificationType = {
    isNotification: boolean,
    notificationCount: number
}

// Define a type for the slice state
type NotificationStateType = {
    notificationPopup: boolean,
    loading: boolean,
    error: string | null,
    unreadCommentCount: number,
    unreadPostCount: number
    postNotification: NotificationType,
    chatNotification: NotificationType,
    commentNotification: NotificationType
    notifications: Notification[]
}

// Define the initial state using that type
const NotificationState: NotificationStateType = {
    notificationPopup: false,
    loading: false,
    error: null,
    notifications: [],
    unreadCommentCount: 0,
    unreadPostCount: 0,

    //
    postNotification: {
        isNotification: false,
        notificationCount: 0
    },
    chatNotification: {
        isNotification: false,
        notificationCount: 0
    },
    commentNotification: {
        isNotification: false,
        notificationCount: 0
    },
}

export const NotificationSlice = createSlice({
    name: 'Notification',
    initialState: NotificationState,
    reducers: {
        setOnNotificationPopup: (state) => {
            state.notificationPopup = true
        },
        setOffNotificationPopup: (state) => {
            state.notificationPopup = false
        },
        setResetNotificationPopup: (state) => {
            state.notificationPopup = false
        },
        setPostNotification: (state, action: PayloadAction<Notification>) => {
            const find = state.notifications.find((notification) => notification.postId === action.payload.postId)
            if (!find) {
                state.notificationPopup = true
                state.notifications.unshift(action.payload)
                state.unreadPostCount += 1
            }
        },
        setChatNotification: (state, action: PayloadAction<NotificationType>) => {
            state.chatNotification = action.payload
        },
        setCommentNotification: (state, action: PayloadAction<NotificationType>) => {
            state.commentNotification = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountNotificationApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAccountNotificationApi.fulfilled, (state, action: PayloadAction<Notification[]>) => {
                state.loading = false
                state.error = null
                state.notifications = action.payload
            })
            .addCase(fetchAccountNotificationApi.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload || 'Failed to fetch notification'
            })
            // fetchUnreadNotificationCountApi
            .addCase(fetchUnreadNotificationCountApi.pending, (state) => {

            })
            .addCase(fetchUnreadNotificationCountApi.fulfilled, (state, action: PayloadAction<{
                unreadCommentCount: number,
                unreadPostCount: number
            }>) => {
                if (action.payload.unreadPostCount > 0 || action.payload.unreadCommentCount > 0) {
                    state.unreadCommentCount = action.payload.unreadCommentCount
                    state.unreadPostCount = action.payload.unreadPostCount
                }
            })
            .addCase(fetchUnreadNotificationCountApi.rejected, (state, action: PayloadAction<any>) => {

            })
    },
})

export const {
    setOnNotificationPopup,
    setOffNotificationPopup,
    setResetNotificationPopup,
    setPostNotification,
    setChatNotification,
    setCommentNotification
} = NotificationSlice.actions

export default NotificationSlice.reducer