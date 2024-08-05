import { uploadFirebaseFile } from "@/lib/firebase/upload-file";
import { graphqlQuery } from "@/lib/gql/GraphqlQuery";
import { ShowUploadImage } from "@/redux/slice/account";
import { createAsyncThunk } from "@reduxjs/toolkit";

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