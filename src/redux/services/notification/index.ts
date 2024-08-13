import { graphqlQuery } from "@/lib/gql/GraphqlQuery";
import { PostActionsProps } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNotificationApi = createAsyncThunk(
  'createNotificationApi/post',
  async (postActionsProps: PostActionsProps, thunkAPI) => {
    try {
      let query = `mutation CreateNotification($createNotificationInput: CreateNotificationInput!) {
        createNotification(createNotificationInput: $createNotificationInput) {
          id
          type
          authorId
          recipientId
          postId
          createdAt
          seen
        }
      }`
      const res = await graphqlQuery({
        query: query,
        variables: {
          createNotificationInput: {
            type: postActionsProps.type,
            recipientId: postActionsProps.recipientId,
            authorId: postActionsProps.authorId,
            postId: postActionsProps.postId
          }
        }
      })

      return res.createNotification
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);

export const destroyNotificationApi = createAsyncThunk(
  'destroyNotificationApi/post',
  async (postActionsProps: PostActionsProps, thunkAPI) => {
    try {
      let query = `mutation CreateNotification($destroyNotificationInput: CreateNotificationInput!) {
        destroyNotification(destroyNotificationInput: $destroyNotificationInput) {
         __typename
        }
      }`
      const res = await graphqlQuery({
        query: query,
        variables: {
          destroyNotificationInput: {
            type: postActionsProps.type,
            recipientId: postActionsProps.recipientId,
            authorId: postActionsProps.authorId,
            postId: postActionsProps.postId
          }
        }
      })

      return res.createMessage
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);


export const fetchAccountNotificationApi = createAsyncThunk(
  'fetchAccountNotificationApi/post',
  async (_, thunkAPI) => {
    try {
      let query = `query FindAllNotifications {
        findAllNotifications {
          id
          type
          authorId
          recipientId
          postId
          author {
            username
            profilePicture
          }
          post {
            id
            fileUrl
          }
          commentId
          storyId
          reelId
          createdAt
          seen
        }
      }`
      const res = await graphqlQuery({
        query: query,
      })

      return res.findAllNotifications
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);

export const fetchUnreadNotificationCountApi = createAsyncThunk(
  'fetchUnreadNotificationCountApi/post',
  async (_, thunkAPI) => {
    try {
      let query = `query Query {
        unseenNotifications {
          unreadCommentCount
          unreadPostCount
        }
      }
      `
      const res = await graphqlQuery({
        query: query,
      })

      return res.unseenNotifications
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        ...error?.response?.data,
      })
    }
  }
);