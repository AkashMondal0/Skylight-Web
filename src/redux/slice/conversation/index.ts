import { fetchConversationApi, fetchConversationsApi } from '@/redux/services/conversation'
import { Conversation, Message } from '@/types'
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

    createLoading: boolean
    createError: string | null
}

// Define the initial state using that type
const ConversationState: ConversationState = {
    conversationList: [],
    listLoading: false,
    listError: null,

    conversation: null,
    loading: false,
    error: null,

    createLoading: false,
    createError: null,
}

export const ConversationSlice = createSlice({
    name: 'conversation',
    initialState: ConversationState,
    reducers: {
        // all conversations
        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            state.conversationList = action.payload
        },
        loadMoreConversations(state, action: PayloadAction<Conversation[]>) { },
        // selected conversation
        setConversation: (state, action: PayloadAction<Conversation>) => {
            state.conversation = action.payload
        },
        // messages
        setMessage: (state, action: PayloadAction<Message>) => {
            // const findConversationIndex = state.conversationList.findIndex((conversation) => conversation.id === action.payload.conversationId)
            // if (findConversationIndex !== -1) {
            //     state.conversationList[findConversationIndex].messages.unshift(action.payload)
            //     state.conversationList[findConversationIndex].lastMessageContent = action.payload.content
            //     state.conversationList[findConversationIndex].updatedAt = action.payload.createdAt
            // }
            // if (state.conversation?.id === action.payload.conversationId) {
            //     state.conversation.messages.push(action.payload)
            //     state.conversation.lastMessageContent = action.payload.content
            //     state.conversation.updatedAt = action.payload.createdAt
            // }
        },
        loadMessages: (state, action: PayloadAction<Conversation>) => { },
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
        // CreateConnectionWithMessageApi
        // builder.addCase(CreateConnectionWithMessageApi.pending, (state) => {
        //     state.createLoading = true
        //     state.createError = null
        // })
        // builder.addCase(CreateConnectionWithMessageApi.fulfilled, (state, action: PayloadAction<Conversation>) => {
        //     state.createLoading = false
        //     state.list.unshift(action.payload)
        //     state.selectedConversation.Conversation = action.payload
        // })
        // builder.addCase(CreateConnectionWithMessageApi.rejected, (state, action) => {
        //     state.createLoading = false
        //     state.createError = action.error.message || 'Failed to create connection'
        // })
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
        // builder.addCase(CreateMessageApi.pending, (state) => {
        //     state.message.sendLoading = true
        // })
        // builder.addCase(CreateMessageApi.fulfilled, (state, action: PayloadAction<Message>) => {
        //     state.message.sendLoading = false
        //     state.selectedConversation.Conversation?.messages.push(action.payload)
        //     state.list.map((conversation) => {
        //         if (conversation.id === action.payload.conversationId) {
        //             conversation.messages.unshift(action.payload)
        //             conversation.updatedAt = action.payload.createdAt
        //             conversation.lastMessageContent = action.payload.content
        //         }
        //     })

        // })
        // builder.addCase(CreateMessageApi.rejected, (state, action) => {
        //     state.message.sendError = action.error.message || 'Failed to send message'
        // })
    },
})

export const {
    setConversations,
    setMessage,
    setConversation,
    loadMoreConversations,
    loadMessages,
    setMembersData,
    loadMoreMembersData,
} = ConversationSlice.actions

export default ConversationSlice.reducer