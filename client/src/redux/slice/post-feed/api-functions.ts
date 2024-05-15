import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { supabaseClient } from "@/lib/supa-base"
import { AuthorData, User } from "@/types";

export const postFilesApi = createAsyncThunk(
    'postFilesApi/post',
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
                const { data, error } = await supabaseClient.storage.from('skymedia').upload(`${profileId}/feedPosts/${isFile[index].name}`, isFile[index]);
                console.log(data, error)
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

export const fetchProfileFeedsApi = createAsyncThunk(
    'fetchProfileFeedsApi/get',
    async () => {
        try {
            const res = await axios.get(`/api/post/feeds`)
            return res.data?.data
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);

export const fetchPostLikesApi = createAsyncThunk(
    'fetchPostLikesApi/get',
    async (postId: string) => {
        try {
            const res = await axios.get(`/api/v1/post/${postId}/like/get`)
            return { users: res.data?.data, postId: postId }
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);

export const createPostLikeApi = createAsyncThunk(
    'createPostLikeApi/post',
    async ({
        postId,
        user
    }: {
        postId: string,
        user: AuthorData
    }, thunkApi) => {
        try {
            await axios.post(`/api/v1/post/${postId}/like/create`)
            return { user, postId }
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);

export const destroyPostLikeApi = createAsyncThunk(
    'destroyPostLikeApi/delete',
    async ({
        postId,
        user
    }: {
        postId: string,
        user: AuthorData
    }, thunkApi) => {
        try {
            await axios.delete(`/api/v1/post/${postId}/like/destroy`)
            return { user, postId }
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);

export const createPostCommentApi = createAsyncThunk(
    'createPostCommentApi/post',
    async ({
        postId,
        userId,
        comment
    }: {
        postId: string,
        comment: string,
        userId: string
    }, thunkApi) => {
        try {
            const data = await axios.post(`/api/v1/post/${postId}/comments/create`, {
                postId,
                authorId: userId,
                comment
            })
            return { authorId: userId, postId, comment: data.data.data }
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);

export const destroyPostCommentApi = createAsyncThunk(
    'destroyPostCommentApi/delete',
    async ({
        postId,
        user
    }: {
        postId: string,
        user: AuthorData
    }, thunkApi) => {
        try {
            await axios.delete(`/api/v1/post/${postId}/comment/destroy`)
            return { user, postId }
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);