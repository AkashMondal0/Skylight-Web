import { CreateMessageApi, fetchConversationApi, fetchConversationsApi } from '@/redux/services/conversation'
import { Conversation, Message, Typing } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ConversationState {
    conversationList: Conversation[]
    listLoading: boolean
    listError: string | null

    conversation: Conversation | null
    loading: boolean
    error: string | null

    currentTyping: Typing | null

    createLoading: boolean
    createError: string | null

    createMessageLoading: boolean
    createMessageError: string | null
}

// Define the initial state using that type
const ConversationState: ConversationState = {
    conversationList: [],
    listLoading: false,
    listError: null,

    conversation: null,
    loading: false,
    error: null,

    currentTyping: null,

    createLoading: false,
    createError: null,

    createMessageLoading: false,
    createMessageError: null
}

export const ConversationSlice = createSlice({
    name: 'conversation',
    initialState: ConversationState,
    reducers: {
        // typing 
        setTyping: (state, action: PayloadAction<Typing>) => {
            state.currentTyping = action.payload
        },
        // messages
        setMessage: (state, action: PayloadAction<Message>) => {
            const index = state.conversationList.findIndex((i) => i.id === action.payload.conversationId)
            state.conversationList[index]?.messages?.push(action.payload)
            if (state?.conversation && action.payload.conversationId === state?.conversation.id) {
                state.conversation?.messages.push(action.payload)
            }
        },
        // fetch members data
        setMembersData: (state, action: PayloadAction<Conversation>) => { },
        loadMoreMembersData: (state, action: PayloadAction<Conversation>) => { },
    },
    extraReducers: (builder) => {
        // fetchConversationsApi
        builder.addCase(fetchConversationsApi.pending, (state) => {
            state.listLoading = true
            state.listError = null
        })
        builder.addCase(fetchConversationsApi.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
            state.conversationList = action.payload
            state.listLoading = false
        })
        builder.addCase(fetchConversationsApi.rejected, (state, action) => {
            state.listLoading = false
            state.listError = "error"
        })
        // fetchConversationApi
        builder.addCase(fetchConversationApi.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchConversationApi.fulfilled, (state, action: PayloadAction<Conversation>) => {
            state.conversation = action.payload
            state.loading = false
        })
        builder.addCase(fetchConversationApi.rejected, (state, action) => {
            state.loading = false
            state.error = "error"
        })
        // CreateMessageApi
        builder.addCase(CreateMessageApi.pending, (state) => {
            state.createMessageLoading = true,
                state.createMessageError = null
        })
        builder.addCase(CreateMessageApi.fulfilled, (state, action: PayloadAction<Message>) => {
            if (state.conversation) {
                state.conversation.messages.push(action.payload)
            }
            state.createMessageLoading = false
        })
        builder.addCase(CreateMessageApi.rejected, (state, action) => {
            state.createMessageLoading = false,
                state.createMessageError = "error"
        })
    },
})

export const {
    setMessage,
    setMembersData,
    loadMoreMembersData,
    setTyping
} = ConversationSlice.actions

export default ConversationSlice.reducer