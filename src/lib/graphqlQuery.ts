import { configs } from "@/configs"
import { DeleteAllCookie } from "@/redux/services/account"
import { GraphqlError } from "@/types"
import axios from "axios"

export const graphqlQuery = async ({
    query,
    variables,
    url = `${configs.serverApi.baseUrl}/graphql`,
    BearerToken,
    withCredentials = false,
    errorCallBack
}: {
    query: string
    variables?: any
    url?: string
    BearerToken?: string
    withCredentials?: boolean
    errorCallBack?: (error: GraphqlError[]) => void
}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            ...(BearerToken && { Authorization: `Bearer ${BearerToken}` }),
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const responseBody = await response.json() as {
        data: any,
        errors: GraphqlError[]
    }

    if (responseBody.errors) {
        if (responseBody.errors[0].extensions.code === 'UNAUTHENTICATED') {
            await DeleteAllCookie()
        }
        throw new Error(responseBody.errors[0].message)
    }
    return responseBody.data;
}