import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadFirebaseFile } from "@/lib/firebase/upload-file";
import { graphqlQuery } from "@/lib/gql/GraphqlQuery";
import { AuthorData } from "@/types";
import { FeedQuery, UpdateProfileQuery } from "@/lib/gql/account.queries";
type UpdateProfile = {
    updateUsersInput?: {
        username?: string
        email?: string
        name?: string
        bio?: string
        website?: string[]
        profilePicture?: string
    },
    file?: File,
    profile: AuthorData
}

export const loginApi = async ({
    email,
    password,
}: {
    email: string,
    password: string,
}) => {
    return fetch(`${configs.serverApi.baseUrl}/v1/auth/login`, {
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
        .then(async (res) => {
            if (!res.ok) {
                const error = await res.json()
                throw new Error(`${error.message}`);
            }
            return {
                data: await res.json(),
                message: "Login Successful",
                code: 1
            };
        })
        .catch((e) => {
            return {
                data: e,
                message: e.message,
                code: 0
            }
        });
}

export const registerApi = async ({
    email,
    password,
    name,
    username
}: {
    email: string,
    password: string,
    name: string,
    username: string
}) => {

    return await fetch(`${configs.serverApi.baseUrl}/v1/auth/register`, {
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
        .then(async (res) => {
            if (!res.ok) {
                const error = await res.json()
                throw new Error(`${error.message}`);
            }
            return {
                data: await res.json(),
                message: "Login Successful",
                code: 1
            };
        })
        .catch((e) => {
            return {
                data: e,
                message: e.message,
                code: 0
            }
        });
}

export const logoutApi = async () => {
    DeleteAllCookie()
    await fetch(`${configs.serverApi.baseUrl}/api/logout`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        redirect: "follow",
        credentials: "include",
        body: JSON.stringify({}),
    })
    return true
}

export const DeleteAllCookie = async () => {
    await fetch(`/api/logout`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        credentials: "include",
    })
}

// profile
export const fetchAccountFeedApi = createAsyncThunk(
    'fetchAccountFeedApi/get',
    async (_, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: FeedQuery.query,
            })

            return res[FeedQuery.name]
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message
            })
        }
    }
);

export const profileUpdateApi = createAsyncThunk(
    'profileUpdateApi/post',
    async (data: UpdateProfile, thunkApi) => {
        const { file, profile, updateUsersInput } = data
        try {
            let data;
            if (file) {
                const url = await uploadFirebaseFile(file, profile.id)
                if (!url) {
                    return ""
                }
                const res = await graphqlQuery({
                    query: UpdateProfileQuery.query,
                    variables: {
                        updateUsersInput: { profilePicture: url }
                    }
                })
                data = res[UpdateProfileQuery.name]
            }
            else {
                const res = await graphqlQuery({
                    query: UpdateProfileQuery.query,
                    variables: {
                        updateUsersInput
                    }
                })
                data = res[UpdateProfileQuery.name]
            }

            return data
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);