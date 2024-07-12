// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { AuthorData } from "@/types";
// import { TypeActionLike } from ".";

// export const fetchProfileFeedsApi = createAsyncThunk(
//     'fetchProfileFeedsApi/get',
//     async () => {
//         try {
//             const res = await axios.get(`/api/v1/feed`)
//             return res.data?.data
//         } catch (error: any) {
//             return error?.response?.data?.data
//         }
//     }
// );

// export const fetchPostLikesApi = createAsyncThunk(
//     'fetchPostLikesApi/get',
//     async (postId: string) => {
//         try {
//             const res = await axios.get(`/api/v1/post/${postId}/like/get`)
//             return { users: res.data?.data, postId: postId }
//         } catch (error: any) {
//             return error?.response?.data?.data
//         }
//     }
// );

// export const createPostLikeApi = createAsyncThunk(
//     'createPostLikeApi/post',
//     async ({
//         postId,
//         user,
//         type
//     }: {
//         postId: string,
//         user: AuthorData,
//         type: TypeActionLike
//     }, thunkApi) => {
//         try {
//             await axios.post(`/api/v1/post/${postId}/like/create`)
//             return { user, postId, type }
//         } catch (error: any) {
//             return error?.response?.data?.data
//         }
//     }
// );

// export const destroyPostLikeApi = createAsyncThunk(
//     'destroyPostLikeApi/delete',
//     async ({
//         postId,
//         user,
//         type
//     }: {
//         postId: string,
//         user: AuthorData,
//         type: TypeActionLike
//     }, thunkApi) => {
//         try {
//             await axios.delete(`/api/v1/post/${postId}/like/destroy`)
//             return { postId, type }
//         } catch (error: any) {
//             return error?.response?.data?.data
//         }
//     }
// );

// export const createPostCommentApi = createAsyncThunk(
//     'createPostCommentApi/post',
//     async ({
//         postId,
//         user,
//         comment,
//         type
//     }: {
//         postId: string,
//         comment: string,
//         user: AuthorData
//         type: TypeActionLike
//     }, thunkApi) => {
//         try {
//             const data = await axios.post(`/api/v1/post/${postId}/comments/create`, {
//                 postId,
//                 authorId: user.id,
//                 comment
//             })

//             return { postId, comment: { ...data.data.data, authorData: user }, type }
//         } catch (error: any) {
//             return error?.response?.data?.data
//         }
//     }
// );

// export const destroyPostCommentApi = createAsyncThunk(
//     'destroyPostCommentApi/delete',
//     async ({
//         postId,
//         user,
//         type,
//         commentId
//     }: {
//         postId: string,
//         user: AuthorData,
//         type: TypeActionLike,
//         commentId: string
//     }, thunkApi) => {
//         try {
//             await axios.delete(`/api/v1/post/${postId}/comment/destroy`, {
//                 data: {
//                     commentId
//                 }
//             })
//             return { postId, type, commentId }
//         } catch (error: any) {
//             return error?.response?.data?.data
//         }
//     }
// );