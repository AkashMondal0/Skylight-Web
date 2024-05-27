import { RootState } from '@/redux/store'
import { Conversation } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ConversationState {
    list: Conversation[]
    loading: boolean
    error: string | null
    message: {
        loading: boolean
        error: string | null
        sendLoading: boolean
        sendError: string | null
    }
    selectedConversation: {
        Conversation: Conversation | null
        loading: boolean
        error: string | null
    }
}

// Define the initial state using that type
const ConversationState: ConversationState = {
    list: [],
    loading: false,
    error: null,
    message: {
        loading: false,
        error: null,
        sendLoading: false,
        sendError: null
    },
    selectedConversation: {
        Conversation: null,
        loading: false,
        error: null
    }
}

export const ConversationSlice = createSlice({
    name: 'conversation',
    initialState: ConversationState,
    reducers: {
        // all conversations
        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            state.list = action.payload
        },
        loadMoreConversations(state, action: PayloadAction<Conversation[]>) { },
        // selected conversation
        setSelectConversation: (state, action: PayloadAction<Conversation>) => { },
        loadMessages: (state, action: PayloadAction<Conversation>) => { },
        // fetch members data
        setMembersData: (state, action: PayloadAction<Conversation>) => { },
        loadMoreMembersData: (state, action: PayloadAction<Conversation>) => { },
    },
    extraReducers: (builder) => {

    },
})

export const {
    setConversations,
    loadMoreConversations,
    setSelectConversation,
    loadMessages,
    setMembersData,
    loadMoreMembersData
} = ConversationSlice.actions

export default ConversationSlice.reducer