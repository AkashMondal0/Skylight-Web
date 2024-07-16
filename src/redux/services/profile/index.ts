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
    async (data: {
        sessionId: string
        authorUserId: string,
        authorUsername: string,
        followingUserId: string,
        followingUsername: string,
        updateCount: boolean
    }, thunkApi) => {
        const { sessionId, updateCount, ...createFriendshipInput } = data

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

            return {
                userId: createFriendshipInput.authorUserId,
                sessionId,
                updateCount
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const destroyFriendshipApi = createAsyncThunk(
    'destroyFriendshipApi/post',
    async (data: {
        sessionId: string
        authorUserId: string,
        authorUsername: string,
        followingUserId: string,
        followingUsername: string,
        updateCount: boolean
    }, thunkApi) => {
        const { sessionId, updateCount, ...destroyFriendship } = data

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

            return {
                userId: destroyFriendship.authorUserId,
                sessionId,
                updateCount
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const fetchUserProfileFollowingUserApi = createAsyncThunk(
    'fetchUserProfileFollowingUserApi/get',
    async (viewFollowingInput: findDataInput, thunkApi) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            let query = `query FindAllFollowing($viewFollowingInput: SearchByUsernameInput!) {
                findAllFollowing(viewFollowingInput: $viewFollowingInput) {
                  username
                  profilePicture
                  name
                  id
                  email
                  following
                  followed_by
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { viewFollowingInput }
            })

            return res.findAllFollowing
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const fetchUserProfileFollowerUserApi = createAsyncThunk(
    'fetchUserProfileFollowerUserApi/get',
    async (viewFollowerInput: findDataInput, thunkApi) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            let query = `query FindAllFollower($viewFollowerInput: SearchByUsernameInput!) {
                findAllFollower(viewFollowerInput: $viewFollowerInput) {
                  id
                  username
                  email
                  name
                  profilePicture
                  followed_by
                  following
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { viewFollowerInput }
            })

            return res.findAllFollower
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);