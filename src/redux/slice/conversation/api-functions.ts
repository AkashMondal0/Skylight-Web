import { Conversation } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreateConnectionApi = createAsyncThunk(
    'CreateConnectionApi/get',
    async (
        {
            authorId,
            members,
            isGroup
        }: {
            authorId: string,
            members: string[],
            isGroup: boolean
        }
    ) => {
        try {
            const res = await axios.post(`/api/v1/inbox/create`, {
                authorId,
                members,
                isGroup
            })
            return res.data?.data
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);

export const CreateConnectionWithMessageApi = createAsyncThunk(
    'CreateConnectionWithMessageApi/get',
    async (
        {
            authorId,
            members,
            isGroup,
            content,
            membersData
        }: {
            authorId: string,
            members: string[],
            isGroup: boolean,
            content: string,
            membersData: Conversation["membersData"]
        }, thunkApi
    ) => {
        try {
            const res = await axios.post(`/api/v1/inbox/create`, {
                authorId,
                members: [authorId, ...members],
                isGroup
            })
            if (!res.data?.data?.id) {
                throw new Error("Failed to create conversation")
            }
            const mes = await axios.post(`/api/v1/inbox/${res.data?.data?.id}/message/create`, {
                content,
                authorId,
                conversationId: res.data?.data?.id
            })

            if (!mes.data?.data?.id) {
                throw new Error("Failed to create message")
            }

            const newChat: Conversation = {
                ...res.data?.data,
                membersData: membersData,
                messages: [mes.data?.data],
                lastMessageContent: mes.data?.data?.content,
            }
            return newChat
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);

export const CreateMessageApi = createAsyncThunk(
    'CreateMessageApi/get',
    async ({
        conversationId,
        content,
        authorId,
        isGroup,
        members
    }: {
        conversationId: string,
        content: string,
        authorId: string,
        isGroup: boolean,
        members: string[]
    }) => {
        try {
            const res = await axios.post(`/api/v1/inbox/${conversationId}/message/create`, {
                content,
                authorId,
                conversationId,
                isGroup,
                members
            })
            return res.data?.data
        } catch (error: any) {
            return error?.response?.data?.data
        }
    }
);