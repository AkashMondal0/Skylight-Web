import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { followAndunFollow } from ".";

export const searchProfileApi = createAsyncThunk(
    'searchProfileApi/get',
    async ({ keywords }: { keywords: string }, thunkApi) => {
        try {
            const res = await axios.get(`/api/v1/explore/search?keywords=${keywords}`)
            return res.data.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const FetchUserProfileDataApi = createAsyncThunk(
    'FetchUserProfileDataApi/get',
    async ({ id }: { id: string }, thunkApi) => {
        try {
            const res = await axios.get(`/api/profile/${id}`)
            return res.data.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const UserFollowingApi = createAsyncThunk(
    'UserFollowingApi/post',
    async ({
        followingUserId,
        followerUserId,
        followingUsername,
        followerUsername,
        isProfile,
        type,
        userId
    }: followAndunFollow, thunkApi) => {
        try {
            // await new Promise(r => setTimeout(r, 5000))
            const res = await axios.post(`/api/v1/profile/follow/create`, {
                followingUserId,
                followerUserId,
                followingUsername,
                followerUsername
            })
            return { ...res.data.data, isProfile, type, userId }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const UserUnFollowingApi = createAsyncThunk(
    'UserUnFollowingApi/post',
    async ({
        followingUserId,
        followerUserId,
        isProfile,
        type,
        userId
    }: followAndunFollow, thunkApi) => {
        try {
            // await new Promise(r => setTimeout(r, 5000))
            const res = await axios.post(`/api/profile/following/destroy`, {
                followingUserId,
                followerUserId
            })
            return { ...res.data.data, isProfile, type, userId }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const FetchFollowingsUserDataApi = createAsyncThunk(
    'FetchFollowingsUserDataApi/get',
    async ({
        profileId,
        skip,
        size
    }: {
        profileId: string,
        skip: number,
        size: number
    }, thunkApi) => {
        try {
            const res = await axios.get(`/api/profile/show/followings/${profileId}?skip=${skip}&size=${size}`)
            return res.data.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const FetchFollowersUserDataApi = createAsyncThunk(
    'FetchFollowersUserDataApi/get',
    async ({
        profileId,
        skip,
        size
    }: {
        profileId: string,
        skip: number,
        size: number
    }, thunkApi) => {
        try {
            const res = await axios.get(`/api/profile/show/followers/${profileId}?skip=${skip}&size=${size}`)
            return res.data.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);