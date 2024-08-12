import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Notification } from '@/types'

// Define a type for the slice state
type NotificationType = {
    isNotification: boolean,
    notificationCount: number
}

// Define a type for the slice state
type NotificationStateType = {
    notificationPopup: boolean,
    postNotification: NotificationType,
    chatNotification: NotificationType,
    commentNotification: NotificationType
}

// Define the initial state using that type
const NotificationState: NotificationStateType = {
    notificationPopup: false,
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
            state.postNotification.notificationCount += 1
            state.postNotification.isNotification = true
            state.notificationPopup = true
        },
        setChatNotification: (state, action: PayloadAction<NotificationType>) => {
            state.chatNotification = action.payload
        },
        setCommentNotification: (state, action: PayloadAction<NotificationType>) => {
            state.commentNotification = action.payload
        }
    },
    extraReducers: (builder) => {

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