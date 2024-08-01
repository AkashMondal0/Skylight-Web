import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadFirebaseFile } from "@/lib/firebase/upload-file";
import { graphqlQuery } from "../../../lib/graphqlQuery";
import { ShowUploadImage } from "@/redux/slice/account";
import { getRandomPost } from "@/components/sky/random";
import { AuthorData } from "@/types";
const _posts = getRandomPost(20)

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
            // for (let index = 0; index < isFile.length; index++) {
            //     thunkApi.dispatch(ShowUploadImage(URL.createObjectURL(isFile[index])) as any)
            //     const url = await uploadFirebaseFile(isFile[index], profileId)
            //     if (url) {
            //         photoUrls.push(url)
            //     }
            // }
            await Promise.all(isFile.map(async (_, index) => {
                thunkApi.dispatch(ShowUploadImage(URL.createObjectURL(isFile[index])) as any)
                const url = await uploadFirebaseFile(isFile[index], profileId)
                if (url) {
                    photoUrls.push(url)
                }
            }))

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
            DeleteAllCookie()
            return res
        } catch (error: any) {
            return ErrorFunction(error)
        }
    }
);

export const fetchAccountFeedApi = createAsyncThunk(
    'fetchAccountFeedApi/get',
    async (_, thunkApi) => {
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

            return res.feedTimelineConnection.concat(_posts)
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
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

type UpdateProfile = {
    updateUsersInput?: {
        username?: string
        email?: string
        name?: string
        profilePicture?: string
    },
    file?: File,
    profile: AuthorData
}

// profileUpdateApi
export const profileUpdateApi = createAsyncThunk(
    'profileUpdateApi/post',
    async (data: UpdateProfile, thunkApi) => {
        const { file, profile, updateUsersInput } = data

        let query = `mutation UpdateUserProfile($updateUsersInput: UpdateUsersInput!) {
            updateUserProfile(UpdateUsersInput: $updateUsersInput) {
              profilePicture
              name
              id
              email
              username
            }
          }`

        try {
            if (file) {
                const url = await uploadFirebaseFile(file, profile.id)
                if (!url) {
                    return ""
                }
                const res = await graphqlQuery({
                    query: query,
                    variables: {
                        updateUsersInput: { profilePicture: url }
                    }
                })
                return res.updateUserProfile
            }
            else {
                const res = await graphqlQuery({
                    query: query,
                    variables: {
                        updateUsersInput
                    }
                })
                return res.updateUserProfile
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);