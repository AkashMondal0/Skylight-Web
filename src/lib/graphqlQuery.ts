import { configs } from "@/configs"
import { DeleteAllCookie } from "@/redux/services/account"
import { GraphqlError } from "@/types"

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
        await graphqlErrorTypes(responseBody.errors[0])
    }
    return responseBody.data;
}

export const graphqlErrorTypes = async (e: GraphqlError) => {
    switch (e.extensions.code) {
        case 'UNAUTHENTICATED':
            throw new Error("UNAUTHENTICATED")
        case 'INTERNAL_SERVER_ERROR':
            throw new Error("INTERNAL_SERVER_ERROR")
        case 'BAD_USER_INPUT':
            throw new Error('INTERNAL_SERVER_ERROR')
        default:
            throw new Error("INTERNAL_SERVER_ERROR")
    }
}