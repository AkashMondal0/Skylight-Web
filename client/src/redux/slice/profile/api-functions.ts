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
            const res = await axios.get(`/api/authentication/login`, {
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
    }: {
        email: string,
        password: string,
        name: string,
    }, thunkApi) => {
        try {
            const res = await axios.post(`/api/authentication/register`, {
                email: email,
                password: password,
                username: name
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
    async ({ token }: { token: string }, thunkApi) => {
        try {
            const res = await axios.get(`${url}/auth/register`, {
                headers: {
                    authorization: token
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