import { graphqlQuery } from "@/lib/graphqlQuery";
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
            const res = await graphqlQuery({
                query: query,
                variables: {
                    createFriendshipInput
                }
            })

            return res.createFriendship.friendShip
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
        // authorUserId?: string,
        authorUsername: string,
        // followingUserId?: string,
        followingUsername: string
    }, thunkApi) => {
        try {
            let query = `mutation DestroyFriendship($destroyFriendship: DestroyFriendship!) {
                destroyFriendship(destroyFriendship: $destroyFriendship) {
                  friendShip
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { 
                    destroyFriendship
                 }
            })

            return res.destroyFriendship.friendShip
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);