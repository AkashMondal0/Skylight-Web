import { graphqlQuery } from "@/lib/graphqlQuery";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchConversationsApi = createAsyncThunk(
  'fetchConversationsApi/get',
  async (_, thunkAPI) => {
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
  }
);

export const fetchConversationApi = createAsyncThunk(
  'fetchConversationApi/get',
  async (id: string, thunkAPI) => {
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
  }
);