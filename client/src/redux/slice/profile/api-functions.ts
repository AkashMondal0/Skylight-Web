import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = configs.serverApi.baseUrl

export const loginApi = createAsyncThunk(
    'login/post',
    async ({
        email,
        password,
    }: {
        email: string,
        password: string,
    }, thunkApi) => {
        try {
            const res = await axios.get(`/api/account/login`, {
                headers: {
                    email,
                    password
                }
            })
            return res.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const registerApi = createAsyncThunk(
    'register/post',
    async ({
        email,
        password,
        name,
        username
    }: {
        email: string,
        password: string,
        name: string,
        username: string
    }, thunkApi) => {
        try {
            const res = await axios.post(`/api/account/register`, {
                email: email,
                password: password,
                name: name,
                username: username
            })
            return res.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);


export const fetchProfileDataApi = createAsyncThunk(
    'fetchProfileDataApi/get',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`/api/account/data`)
            return res.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const logoutApi = createAsyncThunk(
    'logoutApi/post',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`/api/account/logout`)
            return res.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

