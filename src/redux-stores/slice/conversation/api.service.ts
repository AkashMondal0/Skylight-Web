import { findDataInput, Post } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CQ } from "./conversation.queries";
import { configs } from "@/configs";
import { uploadFileToSupabase } from "@/lib/SupaBase-uploadFile";
import { graphqlQuery } from "@/lib/graphqlQuery";
export const fetchConversationsApi = createAsyncThunk(
    "fetchConversationsApi/get",
    async (limitAndOffset: findDataInput, thunkAPI) => {
        try {
            const res = await graphqlQuery({
                query: CQ.findAllConversation,
                variables: { graphQlPageQuery: limitAndOffset },
            });
            return res;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                ...error?.response?.data,
            });
        }
    },
);

export const fetchConversationApi = createAsyncThunk(
    "fetchConversationApi/get",
    async (id: string, thunkAPI) => {
        try {
            const res = await graphqlQuery({
                query: CQ.findOneConversation,
                variables: { graphQlPageQuery: { id } },
            });
            return res;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                ...error?.response?.data,
            });
        }
    },
);

export const fetchConversationAllMessagesApi = createAsyncThunk(
    "fetchConversationAllMessagesApi/get",
    async (graphQlPageQuery: findDataInput, thunkAPI) => {
        try {
            const res = await graphqlQuery({
                query: CQ.findAllMessages,
                variables: { graphQlPageQuery },
            });
            return res;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                ...error?.response?.data,
            });
        }
    },
);

export const CreateConversationApi = createAsyncThunk(
    "CreateConversationApi/post",
    async (memberIds: string[], thunkAPI) => {
        try {
            const res = await graphqlQuery({
                query: CQ.createConversation,
                variables: {
                    createConversationInput: {
                        isGroup: false,
                        memberIds,
                    },
                },
            });
            return res;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                ...error?.response?.data,
            });
        }
    },
);

//  messages
export const CreateMessageApi = createAsyncThunk(
    "CreateMessageApi/post",
    async (createMessageInput: {
        content: string;
        authorId: string;
        conversationId: string;
        members: string[];
        fileUrl: File[];
    }, thunkAPI) => {
        try {
            let fileUrls: Post["fileUrl"] = [];
            if (createMessageInput.fileUrl.length > 0) {
                await Promise.all(
                    createMessageInput.fileUrl.map(async (file) => {
                        // thunkApi.dispatch(currentUploadingFile(file.uri))
                        await new Promise((resolve) =>
                            setTimeout(resolve, 300)
                        );
                        //TODO: compress image
                        // const compressedImages =
                        //     await ImageCompressorAllQuality({
                        //         image: file.uri,
                        //     });
                        // if (!compressedImages) return;
                        // fileUrls.push({
                        //     id: file.id,
                        //     urls: compressedImages,
                        //     type: file.mediaType === "photo"
                        //         ? "photo"
                        //         : "video",
                        // });
                    }),
                );
            }

            createMessageInput.fileUrl = fileUrls as any;
            const res = await graphqlQuery({
                query: CQ.createMessage,
                variables: { createMessageInput },
            });
            return res;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                ...error?.response?.data,
            });
        }
    },
);

export const conversationSeenAllMessage = createAsyncThunk(
    "conversationSeenAllMessage/post",
    async ({
        conversationId,
        authorId,
    }: {
        conversationId: string;
        authorId: string;
    }, thunkAPI) => {
        try {
            await graphqlQuery({
                query: CQ.seenMessages,
                variables: { conversationId },
            });
            return { conversationId, authorId };
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                ...error?.response?.data,
            });
        }
    },
);

// ai messages

export const AiMessagePromptApi = createAsyncThunk(
    "AiMessagePromptApi/post",
    async (data: {
        content: string;
        authorId: string;
        file?: string | null;
    }, thunkAPI) => {
        if (!configs.serverApi.aiApiUrl) {
            return thunkAPI.rejectWithValue({
                message: "AI API URL not found",
            });
        }
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let raw;
            if (data.file) {
                //TODO: upload file to supabase
                // let fileUrl = await uploadFileToSupabase(
                //     data?.file,
                //     "image/jpeg",
                //     data.authorId,
                // );
                // raw = JSON.stringify({
                //     "image": configs.serverApi.supabaseStorageUrl + fileUrl,
                //     "query": data.content,
                // });
            } else {
                raw = JSON.stringify({
                    "query": data.content,
                });
            }
            const res = await fetch(configs.serverApi.aiApiUrl, {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            });
            const resJson = await res.text();
            return resJson;
        } catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue({
                ...error?.response?.data,
            });
        }
    },
);
