import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProfileApi = createAsyncThunk(
    'searchProfileApi/post',
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
    'FetchUserProfileDataApi/post',
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

