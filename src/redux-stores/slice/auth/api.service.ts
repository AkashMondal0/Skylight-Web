import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AQ } from "../account/account.queries";
import { graphqlQuery } from "@/lib/graphqlQuery";
export const loginApi = async ({
    email,
    password,
}: {
    email: string,
    password: string,
}) => {
    const res = await fetch(`/api/login`, {
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
    const _data = await res.json()
    return _data
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

    return await fetch(`${configs.serverApi.baseUrl}/auth/register`, {
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
            const _data = await res.json()
            if (!res.ok) {
                return {
                    data: _data,
                    message: _data.message,
                    code: 0
                }
            }
            return {
                data: _data,
                message: "Register Successful",
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
    try {
        await fetch(`/api/logout`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
            redirect: "follow",
            credentials: "include",
        })
        location.reload()
        return true
    } catch (error) {
        console.error("Error in logging out", error)
        return false
    }
}

export const profileUpdateApi = createAsyncThunk(
    'profileUpdateApi/post',
    async (data: {
        updateUsersInput?: {
            username?: string
            email?: string
            name?: string
            bio?: string
            website?: string[]
            profilePicture?: string
        },
        fileUrl?: string | null
        profileId: string
    }, thunkApi) => {
        const { fileUrl, profileId, updateUsersInput } = data;
        try {
            let data; // to store the response
            if (fileUrl) {
                // Compress the image
                // const CImg = await ImageCompressor({
                //     image: fileUrl,
                //     quality: "low"
                // });
                // // Upload the image to supabase
                // const url = await uploadFileToSupabase(CImg, "image/jpeg", profileId);
                // if (!url) {
                //     return "";
                // }
                // Update the user profile with the new image
                const res = await graphqlQuery({
                    query: AQ.updateUserProfile,
                    variables: {
                        // updateUsersInput: { profilePicture: url }
                    }
                });
                data = res;
            }
            // Update only the user profile with the new details
            else {
                const res = await graphqlQuery({
                    query: AQ.updateUserProfile,
                    variables: {
                        updateUsersInput
                    }
                });
                data = res;
            }
            // Update the session with the new details
            const { id, ...updatedDetails } = data;
            // const session = await getSecureStorage<Session["user"]>(configs.sessionName);
            // await SecureStorage("set", configs.sessionName, JSON.stringify({
            //     ...session,
            //     ...updatedDetails
            // }));
            return updatedDetails;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            });
        }
    }
);