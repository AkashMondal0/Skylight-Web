import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Notification } from '@/types'
import { fetchAccountNotificationApi } from '@/redux/services/notification'

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
        setOnNotificationPopup: (state, action: PayloadAction<boolean>) => {
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
           if(!find) {
            state.postNotification.notificationCount += 1
            state.postNotification.isNotification = true
            state.notificationPopup = true
            state.notifications.unshift(action.payload)
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