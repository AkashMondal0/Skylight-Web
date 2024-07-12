import { graphqlQuery } from "@/lib/graphqlQuery";
import { findDataInput } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfileDetailApi = createAsyncThunk(
    'fetchProfileFeedApi/get',
    async (username: string, thunkApi) => {
        try {
            let query = `query ProfileView($username: String!) {
                profileView(username: $username) {
                  id
                  username
                  email
                  name
                  profilePicture
                  postCount
                  followerCount
                  followingCount
                  friendship {
                    followed_by
                    following
                  }
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { username }
            })

            return res.profileView
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const fetchUserProfilePostsApi = createAsyncThunk(
    'fetchUserProfilePostApi/get',
    async (findPosts: findDataInput, thunkApi) => {
        try {
            let query = `query FindProfilePosts($findPosts: SearchByUsernameInput!) {
                findProfilePosts(findPosts: $findPosts) {
                  user {
                    username
                    profilePicture
                    name
                    email
                  }
                  commentCount
                  content
                  createdAt
                  fileUrl
                  id
                  is_Liked
                  likeCount
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { findPosts }
            })

            return res.findProfilePosts
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const createFriendshipApi = createAsyncThunk(
    'createFriendshipApi/post',
    async (createFriendshipInput: {
        authorUserId: string,
        authorUsername: string,
        followingUserId: string,
        followingUsername: string
    }, thunkApi) => {
        try {
            let query = `mutation CreateFriendship($createFriendshipInput: CreateFriendshipInput!) {
                createFriendship(createFriendshipInput: $createFriendshipInput) {
                  friendShip
                }
              }`
            await graphqlQuery({
                query: query,
                variables: {
                    createFriendshipInput
                }
            })

            return { userId: createFriendshipInput.authorUserId }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const destroyFriendshipApi = createAsyncThunk(
    'destroyFriendshipApi/post',
    async (destroyFriendship: {
        authorUserId: string,
        authorUsername: string,
        followingUserId: string,
        followingUsername: string
    }, thunkApi) => {
        try {
            let query = `mutation DestroyFriendship($destroyFriendship: DestroyFriendship!) {
                destroyFriendship(destroyFriendship: $destroyFriendship) {
                  friendShip
                }
              }`
            await graphqlQuery({
                query: query,
                variables: {
                    destroyFriendship
                }
            })

            return { userId: destroyFriendship.authorUserId }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);