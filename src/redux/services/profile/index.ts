import { graphqlQuery } from "@/lib/graphqlQuery";
import { findDataInput } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomProfilePost } from "@/components/sky/random";
const _post = getRandomProfilePost(20)

export const fetchUserProfileDetailApi = createAsyncThunk(
    'fetchProfileFeedApi/get',
    async (username: string, thunkApi) => {
        try {
            let query = `query FindUserProfile($username: String!) {
                findUserProfile(username: $username) {
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

            return res.findUserProfile
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const fetchUserProfilePostsApi = createAsyncThunk(
    'fetchUserProfilePostApi/get',
    async (data: findDataInput, thunkApi) => {
        const { username, ...findPosts } = data
        findPosts.id = username
        try {
            let query = `query FindProfilePosts($findPosts: GraphQLPageQuery!) {
                findProfilePosts(findPosts: $findPosts) {
                  id
                  content
                  fileUrl
                  title
                  createdAt
                  commentCount
                  likeCount
                  is_Liked
                  user {
                    username
                    email
                    name
                    profilePicture
                  }
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { findPosts }
            })
            return [...res.findProfilePosts, ..._post,..._post,..._post,..._post,..._post,..._post,..._post,..._post,..._post]

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
        authorUserId: string,
        authorUsername: string,
        followingUserId: string,
        followingUsername: string
    }, thunkApi) => {
        const { ...createFriendshipInput } = data

        try {
            let query = `mutation CreateFriendship($createFriendshipInput: CreateFriendshipInput!) {
                createFriendship(createFriendshipInput: $createFriendshipInput) {
                  __typename
                }
              }`
            await graphqlQuery({
                query: query,
                variables: {
                    createFriendshipInput
                }
            })

            return true
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
        authorUserId: string,
        authorUsername: string,
        followingUserId: string,
        followingUsername: string
    }, thunkApi) => {
        const { ...destroyFriendship } = data

        try {
            let query = `mutation DestroyFriendship($destroyFriendship: DestroyFriendship!) {
                destroyFriendship(destroyFriendship: $destroyFriendship) {
                __typename  
                }
              }`
            await graphqlQuery({
                query: query,
                variables: {
                    destroyFriendship
                }
            })

            return true
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const RemoveFriendshipApi = createAsyncThunk(
    'RemoveFriendshipApi/post',
    async (data: {
        authorUserId: string,
        authorUsername: string,
        followingUserId: string,
        followingUsername: string
    }, thunkApi) => {
        const { ...destroyFriendship } = data

        try {
            let query = `mutation DestroyFriendship($destroyFriendship: DestroyFriendship!) {
                destroyFriendship(destroyFriendship: $destroyFriendship) {
                __typename
                }
              }`
            await graphqlQuery({
                query: query,
                variables: {
                    destroyFriendship
                }
            })

            return true
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const fetchUserProfileFollowingUserApi = createAsyncThunk(
    'fetchUserProfileFollowingUserApi/get',
    async (data: findDataInput, thunkApi) => {
        const { username, ...viewFollowingInput } = data
        viewFollowingInput.id = username
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            let query = `query FindAllFollowing($viewFollowingInput: GraphQLPageQuery!) {
                findAllFollowing(viewFollowingInput: $viewFollowingInput) {
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
    async (data: findDataInput, thunkApi) => {
        const { username, ...viewFollowerInput } = data
        viewFollowerInput.id = username
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            let query = `query FindAllFollower($viewFollowerInput: GraphQLPageQuery!) {
                findAllFollower(viewFollowerInput: $viewFollowerInput) {
                   id
                   username
                   email
                   name
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