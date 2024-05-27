
import { Conversation, Message } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CreateConnectionApi, CreateConnectionWithMessageApi, CreateMessageApi } from './api-functions'

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
    createLoading: boolean
    createError: string | null
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
    },
    createLoading: false,
    createError: null
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
        setSelectConversation: (state, action: PayloadAction<Conversation>) => {
            state.selectedConversation.Conversation = action.payload
        },
        loadMessages: (state, action: PayloadAction<Conversation>) => { },
        // fetch members data
        setMembersData: (state, action: PayloadAction<Conversation>) => { },
        loadMoreMembersData: (state, action: PayloadAction<Conversation>) => { },
    },
    extraReducers: (builder) => {
        // CreateConnectionWithMessageApi
        builder.addCase(CreateConnectionWithMessageApi.pending, (state) => {
            state.createLoading = true
            state.createError = null
        })
        builder.addCase(CreateConnectionWithMessageApi.fulfilled, (state, action: PayloadAction<Conversation>) => {
            state.createLoading = false
            state.list.unshift(action.payload)
            state.selectedConversation.Conversation = action.payload
        })
        builder.addCase(CreateConnectionWithMessageApi.rejected, (state, action) => {
            state.createLoading = false
            state.createError = action.error.message || 'Failed to create connection'
        })
        // CreateConnectionApi
        // builder.addCase(CreateConnectionApi.pending, (state) => {
        //     state.createLoading = true
        //     state.createError = null
        // })
        // builder.addCase(CreateConnectionApi.fulfilled, (state, action: PayloadAction<Conversation>) => {
        //     state.createLoading = false
        //     state.list.unshift(action.payload)
        //     state.selectedConversation.Conversation = action.payload
        // })
        // builder.addCase(CreateConnectionApi.rejected, (state, action) => {
        //     state.createLoading = false
        //     state.createError = action.error.message || 'Failed to create connection'
        // })
        // CreateMessageApi
        builder.addCase(CreateMessageApi.pending, (state) => {
            state.message.sendLoading = true
        })
        builder.addCase(CreateMessageApi.fulfilled, (state, action: PayloadAction<Message>) => {
            state.message.sendLoading = false
            state.selectedConversation.Conversation?.messages.push(action.payload)
            state.list.map((conversation) => {
                if (conversation.id === action.payload.conversationId) {
                    conversation.messages.unshift(action.payload)
                    conversation.updatedAt = action.payload.createdAt
                    conversation.lastMessageContent = action.payload.content
                }
            })

        })
        builder.addCase(CreateMessageApi.rejected, (state, action) => {
            state.message.sendError = action.error.message || 'Failed to send message'
        })
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