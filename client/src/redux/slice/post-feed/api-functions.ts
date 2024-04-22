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
                photoUrls.push(`${configs.supabase.bucketUrl}${data?.path}`)
            }

            // const res = await axios.get(`/api/account/login`, {

            // })
            console.log(photoUrls)
            return photoUrls
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);
