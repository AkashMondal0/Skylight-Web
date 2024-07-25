import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadFirebaseFile } from "@/lib/firebase/upload-file";
import { graphqlQuery } from "../../../lib/graphqlQuery";
import { ShowUploadImage } from "@/redux/slice/account";

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
                thunkApi.dispatch(ShowUploadImage(URL.createObjectURL(isFile[index])) as any)
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

            let query = `mutation CreatePost($createPostInput: CreatePostInput!) {
                createPost(createPostInput: $createPostInput) {
                  updatedAt
                  title
                  id
                  fileUrl
                  createdAt
                  content
                  username
                  authorId
                }
              }
              `
            const res = await graphqlQuery({
                query: query,
                variables: {
                    createPostInput: {
                        status: "published",
                        fileUrl: photoUrls,
                        content: isCaption,
                        authorId: profileId
                    }
                }
            })

            return res.feedTimelineConnection
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

const ErrorFunction = (error: any) => {
    if (error?.response?.data?.message) {
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
            const res = await fetch(`${configs.serverApi.baseUrl}/v1/auth/login`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                redirect: "follow",
                body: JSON.stringify({
                    email,
                    password
                }),
                credentials: "include"
            })
                .then((response) => response.json())

            return {
                data: res,
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
            const res = await fetch(`${configs.serverApi.baseUrl}/v1/auth/register`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                redirect: "follow",
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    username
                }),
                credentials: "include"
            })
                .then((response) => response.json())
            return {
                data: res,
                message: "Register successful",
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
            const res = await fetch(`${configs.serverApi.baseUrl}/v1/auth/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                redirect: "follow",
                credentials: "include",
                body: JSON.stringify({}),
            })
                .then((response) => response.json())
            return res
        } catch (error: any) {
            return ErrorFunction(error)
        }
    }
);

export const fetchAccountFeedApi = createAsyncThunk(
    'fetchAccountFeedApi/get',
    async () => {
        try {
            let query = `query FeedTimelineConnection {
            feedTimelineConnection {
              id
              content
              title
              fileUrl
              createdAt
              updatedAt
              authorId
              commentCount
              likeCount
              is_Liked
              user {
                id
                username
                email
                name
                profilePicture
              }
            }
          }`
            const res = await graphqlQuery({
                query: query,
            })

            return res.feedTimelineConnection
        } catch (error) {

        }
    }
);

export const DeleteAllCookie = async () => {
    await fetch(`/api/v1/auth/logout`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        credentials: "include",
    })
}
