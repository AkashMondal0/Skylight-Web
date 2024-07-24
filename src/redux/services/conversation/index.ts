import { graphqlQuery } from "@/lib/graphqlQuery";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchConversationsApi = createAsyncThunk(
  'fetchConversationsApi/get',
  async (_, thunkAPI) => {
    try {
      let query = `query FindAllConversation($graphQlPageQuery: GraphQLPageQuery!) {
            findAllConversation(GraphQLPageQuery: $graphQlPageQuery) {
              id
              isGroup
              groupName
              groupImage
              groupDescription
              user {
                username
                profilePicture
                name
                id
                email
              }
            }
          }`
      const res = await graphqlQuery({
        query: query,
        variables: { graphQlPageQuery: { id: "no need just for types" } }
      })

      return res.findAllConversation
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);

export const fetchConversationApi = createAsyncThunk(
  'fetchConversationApi/get',
  async (id: string, thunkAPI) => {
    try {
      let query = `query FindOneConversation($graphQlPageQuery: GraphQLPageQuery!) {
        findOneConversation(GraphQLPageQuery: $graphQlPageQuery) {
          id
          members
          authorId
          messages {
            id
            conversationId
            authorId
            content
            fileUrl
            deleted
            seenBy
            createdAt
            updatedAt
          }
          user {
            id
            username
            email
            profilePicture
            name
          }
          isGroup
          updatedAt
          groupName
          groupImage
          groupDescription
          createdAt
          lastMessageContent
        }
      }`
      const res = await graphqlQuery({
        query: query,
        variables: { graphQlPageQuery: { id } }
      })

      return res.findOneConversation
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);

export const CreateMessageApi = createAsyncThunk(
  'CreateMessageApi/post',
  async (createMessageInput: {
    content: string,
    authorId: string,
    conversationId: string,
    fileUrl: string[]
  }, thunkAPI) => {
    try {
      let query = `mutation CreateMessage($createMessageInput: CreateMessageInput!) {
        createMessage(createMessageInput: $createMessageInput) {
          id
          conversationId
          authorId
          content
          fileUrl
          deleted
          seenBy
          createdAt
          updatedAt
        }
      }`
      const res = await graphqlQuery({
        query: query,
        variables: { createMessageInput }
      })

      return res.createMessage
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);
