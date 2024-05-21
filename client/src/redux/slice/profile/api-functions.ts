import { configs } from "@/configs";
import { supabaseClient } from "@/lib/supa-base";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setShowUploadImage } from ".";
import { uploadFirebaseFile } from "@/lib/firebase/upload-file";

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
                thunkApi.dispatch(setShowUploadImage(isFile[index]) as any)
                const { data, error } = await supabaseClient.storage.from('skymedia').upload(`${profileId}/feedPosts/${isFile[index].name}`, isFile[index]);
                await new Promise(resolve => setTimeout(resolve, 2500));

                if (!error) {
                    photoUrls.push(`${configs.supabase.bucketUrl}${data?.path}`)
                } else {
                    photoUrls.push(`${configs.supabase.bucketUrl}${profileId}/feedPosts/${isFile[index].name}`)
                }
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

export const UploadImagesFireBaseApi = createAsyncThunk(
    'UploadImagesFireBaseApi/post',
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
                thunkApi.dispatch(setShowUploadImage(isFile[index]) as any)
                const url = await uploadFirebaseFile(isFile[index],profileId)
                if (url) {
                    photoUrls.push(url)
                }
            }
            if (photoUrls.length === 0) {
                return thunkApi.rejectWithValue({
                    message: 'Upload file failed'
                })
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