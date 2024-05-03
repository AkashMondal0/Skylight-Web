import { configs } from "@/configs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { supabaseClient } from "@/lib/supa-base"
import { User } from "@/types";

export const postFilesApi = createAsyncThunk(
    'postFilesApi/post',
    async ({
        isFile,
        isCaption,
        profile,
    }: {
        isFile: File[],
        isCaption: string,
        profile: User
    }, thunkApi) => {
        try {
            var photoUrls: string[] = []
            for (let index = 0; index < isFile.length; index++) {
                const { data, error } = await supabaseClient.storage.from('skymedia').upload(`${profile.id}/feedPosts/${isFile[index].name}`, isFile[index]);
                console.log(data, error)
                if (!error) {
                    photoUrls.push(`${configs.supabase.bucketUrl}${data?.path}`)
                }else{
                    photoUrls.push(`${configs.supabase.bucketUrl}${profile.id}/feedPosts/${isFile[index].name}`)
                }
            }
            const res = await axios.post(`/api/post/create`, {
                caption: isCaption,
                fileUrl: photoUrls,
                authorId: profile.id
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