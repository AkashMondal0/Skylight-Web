import { graphqlQuery } from "@/lib/graphqlQuery";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchOnePostApi = createAsyncThunk(
    'fetchOnePostApi/get',
    async (postViewId: string, thunkApi) => {
        try {
            let query = `query PostView($postViewId: String!) {
                postView(id: $postViewId) {
                  id
                  content
                  fileUrl
                  createdAt
                  updatedAt
                  commentCount
                  likeCount
                  is_Liked
                  user {
                    id
                    username
                    name
                    profilePicture
                  }
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { postViewId }
            })

            return res.postView
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const createPostLikeApi = createAsyncThunk(
    'createPostLikeApi/post',
    async (createLikeId: string, thunkApi) => {
        try {
            let query = `mutation CreateLike($createLikeId: String!) {
                createLike(id: $createLikeId) {
                  like
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { createLikeId }
            })

            return {
                postId: createLikeId
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const destroyPostLikeApi = createAsyncThunk(
    'destroyPostLikeApi/post',
    async (destroyLikeId: string, thunkApi) => {
        try {
            let query = `mutation DestroyLike($destroyLikeId: String!) {
                destroyLike(id: $destroyLikeId) {
                  like
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { destroyLikeId }
            })

            return {
                postId: destroyLikeId
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);