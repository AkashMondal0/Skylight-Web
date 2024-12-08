import { createAsyncThunk } from "@reduxjs/toolkit";
import { Assets, findDataInput, Story } from "@/types";
import { AQ } from "./account.queries";
import { compressImage } from "@/lib/image.compress";
import { graphqlQuery } from "@/lib/graphqlQuery";
import { uploadFileToSupabase } from "@/lib/SupaBase-uploadFile";
import { uuid } from "@/lib/uuid";
import FileCompressAndUpload from "@/lib/fileCompressAndUpload";

export const fetchAccountFeedApi = createAsyncThunk(
    "fetchAccountFeedApi/get",
    async (limitAndOffset: findDataInput, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: AQ.feedTimelineConnection,
                variables: { limitAndOffset },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const uploadFilesApi = createAsyncThunk(
    "uploadFilesApi/post",
    async (data: {
        files: File[];
        caption?: string;
        location?: string;
        tags?: string[];
        authorId: string;
    }, thunkApi) => {
        try {
            let fileUrls = await FileCompressAndUpload(data.files);
            const res = await graphqlQuery({
                query: AQ.createPost,
                variables: {
                    createPostInput: {
                        status: "published",
                        fileUrl: fileUrls,
                        content: data.caption,
                        authorId: data.authorId,
                    },
                },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const uploadStoryApi = createAsyncThunk(
    "uploadStoryApi/post",
    async (data: {
        files: File[];
        content?: string;
        authorId: string;
        song?: any[];
    }, thunkApi) => {
        try {
            let fileUrls = await FileCompressAndUpload(data.files);
            const res = await graphqlQuery({
                query: AQ.createStory,
                variables: {
                    createStoryInput: {
                        status: "published",
                        fileUrl: fileUrls,
                        content: data.content,
                        authorId: data.authorId,
                    },
                },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const fetchAccountStoryTimelineApi = createAsyncThunk(
    "fetchAccountStoryTimelineApi/get",
    async (limitAndOffset: findDataInput, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: AQ.storyTimelineConnection,
                variables: { limitAndOffset },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const fetchStoryApi = createAsyncThunk(
    "fetchStoryApi/get",
    async (findStoryId: string, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: AQ.findStory,
                variables: { findStoryId },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const fetchAccountStoryApi = createAsyncThunk(
    "fetchAccountStoryApi/get",
    async (findStoryId: string, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: AQ.findStory,
                variables: { findStoryId },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const fetchAccountAllStroyApi = createAsyncThunk(
    "fetchAccountAllStroyApi/get",
    async (limitAndOffset: findDataInput, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: AQ.findAllStory,
                variables: { limitAndOffset },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const uploadHighlightApi = createAsyncThunk(
    "uploadHighlightApi/post",
    async (createHighlightInput: {
        stories: Story[];
        content?: string;
        authorId: string;
        status: string;
        coverImageIndex: number;
    }, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: AQ.createHighlight,
                variables: {
                    createHighlightInput,
                },
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);

export const getSessionApi = createAsyncThunk(
    "getSessionApi/get",
    async (_, thunkApi) => {
        try {
            const res = await graphqlQuery({
                query: AQ.getSessionApi,
                variables: {},
            });
            return res;
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                message: error?.message,
            });
        }
    },
);