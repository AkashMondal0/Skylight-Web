import { configs } from "@/configs";
import { supabaseClient } from "@/lib/supa-base";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setShowUploadImage } from ".";

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

export const UploadImagesApi = createAsyncThunk(
    'UploadImagesApi/post',
    async ({
        isFile,
        isCaption,
        profileId,
    }: {
        isFile: File[],
        isCaption: string,
        profileId: string
    }, thunkApi) => {
        try {
            var photoUrls: string[] = []
            for (let index = 0; index < isFile.length; index++) {
                const makeApiCall = async () => {
                    thunkApi.dispatch(setShowUploadImage(isFile[index]))
                    const { data, error } = await supabaseClient.storage.from('skymedia').upload(`${profileId}/feedPosts/${isFile[index].name}`, isFile[index]);
                    if (!error) {
                        photoUrls.push(`${configs.supabase.bucketUrl}${data?.path}`)
                    } else {
                        photoUrls.push(`${configs.supabase.bucketUrl}${profileId}/feedPosts/${isFile[index].name}`)
                    }
                }

                await new Promise(resolve => setTimeout(resolve, 1500));

                makeApiCall();
            }
            const res = await axios.post(`/api/feeds/create`, {
                caption: isCaption,
                fileUrl: photoUrls,
                authorId: profileId
            })
            return res.data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

