import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
type NotificationType<T> = {
    notification: T[],
    isNotification: boolean,
    notificationCount: number
}

// Define a type for the slice state
type NotificationStateType = {
    postNotification: NotificationType<Notification>,
    chatNotification: NotificationType<Notification>,
    commentNotification: NotificationType<Notification>
}

// Define the initial state using that type
const NotificationState: NotificationStateType = {
    postNotification: {
        notification: [],
        isNotification: false,
        notificationCount: 0
    },
    chatNotification: {
        notification: [],
        isNotification: false,
        notificationCount: 0
    },
    commentNotification: {
        notification: [],
        isNotification: false,
        notificationCount: 0
    },
}

export const NotificationSlice = createSlice({
    name: 'Notification',
    initialState: NotificationState,
    reducers: {

    },
    extraReducers: (builder) => {

    },
})

export const {

} = NotificationSlice.actions

export default NotificationSlice.reducer