import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { setShowUploadImage } from ".";
import { uploadFirebaseFile } from "@/lib/firebase/upload-file";
import { graphqlQuery } from "../lib/graphqlQuery";

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
                await new Promise(resolve => setTimeout(resolve, 500));
                const url = await uploadFirebaseFile(isFile[index], profileId)
                if (url) {
                    photoUrls.push(url)
                }
            }
            if (photoUrls.length === 0) {
                return thunkApi.rejectWithValue({
                    message: 'Upload file failed'
                })
            }
            const res = await axios.post(`/api/v1/feed/create`, {
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

const ErrorFunction = (error: any) => {
    if (axios.isAxiosError(error)) {
        return {
            data: null,
            message: error.response?.data.message,
            code: 0
        }
    } else {
        return {
            data: null,
            message: "An error occurred. Please try again later.",
            code: 0
        }
    }
}

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
            const res = await axios.post(`${configs.serverApi.baseUrl}/v1/auth/login`, {
                email,
                password
            })
            return {
                data: res.data,
                message: "Login successful",
                code: 1
            }
        } catch (error: any) {
            return ErrorFunction(error)
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
            const res = await axios.post(`${configs.serverApi.baseUrl}/v1/auth/register`, {
                email: email,
                password: password,
                name: name,
                username: username
            })
            return {
                data: res.data,
                message: "Register successful",
                code: 1
            }
        } catch (error: any) {
            return ErrorFunction(error)
        }
    }
);

export const fetchProfileDataApi = createAsyncThunk(
    'fetchProfileDataApi/get',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${configs.serverApi.baseUrl}/v1/auth/session`)
            return {
                data: res.data,
                message: "Fetch profile successful",
                code: 1
            }
        } catch (error: any) {
            return ErrorFunction(error)
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
            return ErrorFunction(error)
        }
    }
);

export const fetchProfileFeedApi = createAsyncThunk(
    'fetchProfileFeedApi/get',
    async (_, thunkApi) => {
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
                  top_followers {
                    id
                    email
                    username
                    profilePicture
                  }
                }
              }`

            const res = await graphqlQuery({
                url: `localhost:5000/graphql`,
                query: query,
                withCredentials: true,
                variables: { username: "olivia" },
                BearerToken: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrYXNoIiwiaWQiOiIyNTlmOTgzNy0xNTE0LTQxODMtOTE1Ny1iYzFmMWY1MDRmMGUiLCJlbWFpbCI6ImFrYXNoQGdtYWlsLmNvbSIsIm5hbWUiOiJha2FzaCIsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTE5VDIwOjU1OjM2LjM2MFoiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcxODgzNzE2NiwiZXhwIjoxNzIxNDI5MTY2fQ.GqcG7DWkrnvGhl_3NnotrjaONE8jHAoetJVSkHsBOnc`
            })

            return {
                data: res.data.data,
                message: "Fetch profile feed successful",
                code: 1
            }
        } catch (error: any) {
            return ErrorFunction(error)
        }
    }
);