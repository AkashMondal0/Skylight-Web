import { uploadFirebaseFile } from "@/lib/firebase/upload-file";
import { graphqlQuery } from "@/lib/gql/GraphqlQuery";
import { setUploadImageInMessage, showUploadImageInMessage } from "@/redux/slice/conversation";
import { Message, findDataInput } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchConversationsApi = createAsyncThunk(
  'fetchConversationsApi/get',
  async (_, thunkAPI) => {
    try {
      let query = `query FindAllConversation($graphQlPageQuery: GraphQLPageQuery!) {
        findAllConversation(GraphQLPageQuery: $graphQlPageQuery) {
          id
          members
          authorId
          user {
            id
            username
            email
            name
            profilePicture
          }
          isGroup
          lastMessageContent
          totalUnreadMessagesCount
          lastMessageCreatedAt
          createdAt
          updatedAt
          groupName
          groupImage
          groupDescription
          messages {
            content
            authorId
            conversationId
            createdAt
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
      // await new Promise((resolve) => setTimeout(resolve, 1200))
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

export const fetchConversationAllMessagesApi = createAsyncThunk(
  'fetchConversationAllMessagesApi/get',
  async (graphQlPageQuery: findDataInput, thunkAPI) => {
    try {
      let query = `query FindAllMessages($graphQlPageQuery: GraphQLPageQuery!) {
        findAllMessages(graphQLPageQuery: $graphQlPageQuery) {
          id
          conversationId
          authorId
          content
          user {
            username
            email
            name
            profilePicture
          }
          fileUrl
          deleted
          seenBy
          createdAt
          updatedAt
          members
        }
      }
      `
      const res = await graphqlQuery({
        query: query,
        variables: { graphQlPageQuery }
      })

      return res.findAllMessages
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);

export const CreateConversationApi = createAsyncThunk(
  'CreateConversationApi/post',
  async (memberIds: string[], thunkAPI) => {
    try {
      let query = `mutation CreateConversation($createConversationInput: CreateConversationInput!) {
        createConversation(createConversationInput: $createConversationInput) {
          id
        }
      }`
      const res = await graphqlQuery({
        query: query,
        variables: {
          createConversationInput: {
            isGroup: false,
            memberIds,
          }
        }
      })

      return res.createConversation
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
    members: string[]
    fileUrl: File[]
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

      let photoUrls: string[] = []
      // let tempM: Message | null = null;
      if (createMessageInput.fileUrl.length > 0) {
        // tempM = {
        //   id: new Date().getTime().toString(),
        //   content: createMessageInput.content,
        //   fileUrl: createMessageInput.fileUrl.map((item) => URL.createObjectURL(item)),
        //   authorId: createMessageInput.authorId,
        //   deleted: false,
        //   seenBy: [createMessageInput.authorId],
        //   conversationId: createMessageInput.conversationId,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // }
        // thunkAPI.dispatch(setUploadImageInMessage(tempM) as any)
        await Promise.all(createMessageInput.fileUrl.map(async (item, index) => {
          thunkAPI.dispatch(showUploadImageInMessage({
            currentUploadImgLength: index,
          }) as any)
          const url = await uploadFirebaseFile(item, createMessageInput.authorId)
          if (url) {
            photoUrls.push(url)
          }
        }))
      }

      createMessageInput.fileUrl = photoUrls as any
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

export const conversationSeenAllMessage = createAsyncThunk(
  'conversationSeenAllMessage/post',
  async ({
    conversationId,
    authorId
  }: {
    conversationId: string
    authorId: string
  }, thunkAPI) => {
    try {
      let query = `mutation SeenMessages($conversationId: String!) {
        seenMessages(conversationId: $conversationId) {
          __typename
        }
      }
      `
      await graphqlQuery({
        query: query,
        variables: { conversationId }
      })

      return { conversationId, authorId }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);
