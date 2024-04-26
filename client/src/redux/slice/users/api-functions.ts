import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProfileApi = createAsyncThunk(
    'searchProfileApi/get',
    async ({ keywords }: { keywords: string }, thunkApi) => {
        try {
            const res = await axios.get(`/api/profile/search?keywords=${keywords}`)
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
        followerUserId
    }: {
        followingUserId: string,
        followerUserId: string
    }, thunkApi) => {
        try {
            const res = await axios.post(`/api/profile/following/create`, {
                followingUserId,
                followerUserId
            })
            return res.data.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const UserUnFollowingApi = createAsyncThunk(
    'UserUnFollowingApi/delete',
    async ({
        followingUserId,
        followerUserId
    }: {
        followingUserId: string,
        followerUserId: string
    }, thunkApi) => {
        try {
            const res = await axios.post(`/api/profile/following/destroy`, {
                followingUserId,
                followerUserId
            })
            return res.data.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);